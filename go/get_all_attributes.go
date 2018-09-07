package main

import (
	"encoding/json"
	"fmt"
	"github.com/privacybydesign/irmago"
	"os"
)

func parse(path string, assets string) (*irma.Configuration, error) {
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

type AttributeResult struct {
	Identifier     irma.AttributeTypeIdentifier `json:"id"`
	Name           string                       `json:"name"`
	CredentialName string                       `json:"credentialName"`
	Logo           string                       `json:"logo"`
	Issuer         string                       `json:"issuer"`
}

func getAllAttributes(conf *irma.Configuration) []AttributeResult {
	var results []AttributeResult

	for _, cred := range conf.CredentialTypes {
		for _, attribute := range cred.AttributeTypes {
			attributeIdentifier := irma.NewAttributeTypeIdentifier(cred.SchemeManagerID + "." + cred.IssuerID + "." + cred.ID + "." + attribute.ID)
			issuerId := attributeIdentifier.CredentialTypeIdentifier().IssuerIdentifier()
			results = append(results,
				AttributeResult{
					Identifier:     attributeIdentifier,
					Name:           attribute.Name["en"],
					CredentialName: cred.ShortName["en"],
					Issuer:         conf.Issuers[issuerId].ShortName["en"],
					Logo:           cred.Logo(conf),
				})
		}
	}
	return results
}

func main() {
	// Exit code configuration, see https://stackoverflow.com/questions/24601516/correct-way-to-set-exit-code-of-process
	exitCode := 0
	defer func() {
		os.Exit(exitCode)
	}()

	path := "go/irma_configuration"
	assets := "go/assets"

	// Parse irma_configuration files
	conf, err := parse(path, assets)
	if err != nil {
		fmt.Printf("{\"error\": \"%v\"}", err)
		exitCode = 1
		return
	}

	attributes := getAllAttributes(conf)
	jsonResult, err := json.Marshal(attributes)
	if err != nil {
		fmt.Printf("{\"error\": \"%v\"}", err)
		exitCode = 1
		return
	}
	fmt.Println(string(jsonResult))
}
