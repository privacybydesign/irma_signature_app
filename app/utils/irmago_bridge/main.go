package main

import (
	"fmt"
	"github.com/privacybydesign/irmago"
	"github.com/gopherjs/gopherjs/js"
	"strings"
)

func parse() (*irma.Configuration, error) {
	path := "/tmp/path"
	assets := "TODO"

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

type SearchResultJs struct {
	searchResults []SearchResult
}

func (s *SearchResultJs) GetAttributeNames() map[string]string {
  results := make(map[string]string)
	for _, el := range s.searchResults {
    results[el.identifier] = el.credential.IssuerID + ": " + el.attribute.Name["en"]
  }

	return results
}

var conf *irma.Configuration

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

func SearchAttribute(name string) *js.Object {
	var result SearchResultJs
	result = SearchResultJs{searchAttribute(name, conf)}
	return js.MakeWrapper(&result)
}

func main() {
	var err error
	conf, err = parse()
	if err != nil {
		fmt.Println(err)
		return
	}

	js.Module.Get("exports").Set("irmago", map[string]interface{}{
		"searchAttribute": SearchAttribute,
	})
}
