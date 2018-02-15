package main

import (
  "fmt"
  "github.com/privacybydesign/irmago"
  "github.com/privacybydesign/irmago/irmaclient"
  "os"
  "github.com/go-errors/errors"
  "encoding/json"
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

type CliArgs struct {
  path string
  assets string
  signature string
  signatureRequest string
}

func verify(signature string, signatureRequest string, conf *irma.Configuration) (irmaclient.ProofStatus, *irma.AttributeResultList, error) {
  request := &irma.SignatureRequest{}
  sigRequestJSON := []byte(signatureRequest)
  err := json.Unmarshal(sigRequestJSON, request)
  if err != nil {
    return "", nil, err
  }

  proofStatus, attributeResults := irmaclient.VerifySig(conf, signature, request)
  return proofStatus, attributeResults, nil
}

func getJsonErrorString(e error) string {
  return fmt.Sprintf("{\"error\":\"%v\"}", e)
}

func printUsage() {
  fmt.Println("Usage: " + os.Args[0] + " <path> <assets> <signature> <signatureRequest>")
}

func parseCliArgs() (*CliArgs, error) {
  if len(os.Args) != 5 {
    return nil, errors.New(fmt.Sprintf("Invalid number of CLI arguments, %v instead of 4", len(os.Args) - 1))
  }

  return &CliArgs{os.Args[1], os.Args[2], os.Args[3], os.Args[4]}, nil
}

func main() {
  // Parse CLI args
  cliArgs, err := parseCliArgs()
  if err != nil {
    //fmt.Printf("Error: %v\n", err)
    //printUsage()
    fmt.Print(getJsonErrorString(err))
    return
  }

  //fmt.Printf("\n%v\n%v\n\n", cliArgs.signature, cliArgs.signatureRequest)

  // Parse irma_configuration files
  conf, err := parse(cliArgs.path, cliArgs.assets)
  if err != nil {
    fmt.Print(getJsonErrorString(err))
    return
  }

  result, attributes, err := verify(cliArgs.signature, cliArgs.signatureRequest, conf)
  if err != nil {
    fmt.Print(getJsonErrorString(err))
    return
  }

  if attributes == nil {
    attributes = &irma.AttributeResultList{}
  }

  temp := struct {
    Attributes []*irma.AttributeResult `json:"attributes"`
    ProofStatus irmaclient.ProofStatus `json:"proofStatus"`
  }{
    Attributes: attributes.AttributeResults,
    ProofStatus: result,
  }

  bytes, err := json.Marshal(temp)
  if err != nil {
    fmt.Println(err)
    return
  }
  fmt.Println(string(bytes))
}
