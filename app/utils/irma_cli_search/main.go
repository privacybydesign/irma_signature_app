package main

import (
	"fmt"
	"github.com/credentials/irmago"
  "encoding/json"
	"strings"
  "os"
  "github.com/go-errors/errors"
)

func parse(path string, assets string) (*irma.Configuration, error) {
	// path := "/tmp/path"
	// assets := "/home/koen/Documents/Delivery/irma_sig_ru/irma_configuration"

	conf, err := irma.NewConfiguration(path, assets)

	if err != nil {
		return nil, err
	}

	err = conf.ParseFolder()
	if err != nil {
		return nil, err
	}

	return conf, nil
}

type SearchResult struct {
	identifier  string
	attribute  irma.AttributeDescription
	credential irma.CredentialType
}

type CliArgs struct {
  path string
  assets string
  name string
}

func getAttributeNames(s []SearchResult) (string, error) {
  results := make(map[string]string)
	for _, el := range s {
    results[el.identifier] = el.credential.IssuerID + ": " + el.attribute.Name["en"]
  }

  jsonResult, err := json.Marshal(results)
  if err != nil {
    return "", err
  }

  return string(jsonResult), err
}

func searchAttribute(name string, conf *irma.Configuration) []SearchResult {
	var results []SearchResult

	for _, cred := range conf.CredentialTypes {
		for _, attribute := range cred.Attributes {
			if strings.Contains(strings.ToLower(attribute.ID), strings.ToLower(name)) {
				attributeIdentifier := "irma-demo" + "." + cred.IssuerID + "." + cred.ID + "." + attribute.ID
				results = append(results,
					SearchResult{
						identifier: attributeIdentifier,
						attribute: attribute,
						credential: *cred,
					})
			}
		}
	}
	return results
}

func printUsage() {
  fmt.Println("Usage: " + os.Args[0] + "<path> <assets> <attributeName>")
}

func parseCliArgs() (*CliArgs, error) {
  if len(os.Args) != 4 {
    return nil, errors.New("Invalid CLI arguments!")
  }

  return &CliArgs{os.Args[1], os.Args[2], os.Args[3]}, nil
}

func main() {
  // Exit code configuration, see https://stackoverflow.com/questions/24601516/correct-way-to-set-exit-code-of-process
  exitCode := 0
  defer func() {
    os.Exit(exitCode)
  }()

  // Parse CLI args
  cliArgs, err := parseCliArgs()
	if err != nil {
		fmt.Println(err)
    exitCode = 1
		return
	}

  // Parse irma_configuration files
  conf, err := parse(cliArgs.path, cliArgs.assets)
	if err != nil {
		fmt.Println(err)
    exitCode = 1
		return
	}

  // Search for attributes
  searchResult := searchAttribute(cliArgs.name, conf)
  jsonResult, err := getAttributeNames(searchResult)
  if err != nil {
		fmt.Println(err)
    exitCode = 1
		return
	}

  // Print final result of search
  fmt.Println(string(jsonResult))
  return
}
