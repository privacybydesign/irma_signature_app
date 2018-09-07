package main

import (
  "fmt"
  "github.com/privacybydesign/irmago"
  "os"
  "github.com/go-errors/errors"
  "encoding/json"
)

type CliArgs struct {
  signature string
  signatureRequest string
}

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

func parseSignature(signatureString string) (*irma.SignedMessage, error) {
  signature := &irma.SignedMessage{}
  signatureJSON := []byte(signatureString)
  err := json.Unmarshal(signatureJSON, signature)

  if err != nil {
    return nil, err
  }

  return signature, nil
}

func parseSignatureRequest(signatureRequest string) (*irma.SignatureRequest, error) {
  if signatureRequest == "" {
    return nil, nil
  }
  request := &irma.SignatureRequest{}
  sigRequestJSON := []byte(signatureRequest)
  err := json.Unmarshal(sigRequestJSON, request)

  if err != nil {
    return nil, err
  }

  return request, nil
}

func getJsonErrorString(e error) string {
  return fmt.Sprintf("{\"error\":\"%v\"}", e)
}

func printUsage() {
  fmt.Println("Usage: " + os.Args[0] + " <signature> [<signatureRequest>]")
}

func parseCliArgs() (*CliArgs, error) {
  if len(os.Args) < 2 {
    return nil, errors.New(fmt.Sprintf("Invalid number of CLI arguments, %v instead of >=1", len(os.Args) - 1))
  }

  if len(os.Args) == 2 {
    return &CliArgs{
      signature:os.Args[1],
      signatureRequest: ""}, nil
  }

  return &CliArgs{ signature: os.Args[1], signatureRequest: os.Args[2]}, nil
}

func printError(err error) {
  fmt.Printf("{\"error\": \"%v\"}", err)
}

func verifyAndSerialize(signature *irma.SignedMessage, signatureRequest *irma.SignatureRequest, conf *irma.Configuration) (string, error){
  disclosedAttributes, proofStatus, err := signature.Verify(conf, signatureRequest)
  if (err != nil) {
    return "", err
  }

  credentialString, err := json.Marshal(disclosedAttributes);
  if (err != nil) {
    return "", err
  }
  return fmt.Sprintf("{\"proofStatus\": \"%v\", \"credentialList\": %v}",
    proofStatus, string(credentialString)), nil
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
    fmt.Print(getJsonErrorString(err))
    return
  }

  //fmt.Printf("\n%v\n%v\n\n", cliArgs.signature, cliArgs.signatureRequest)

  path := "go/irma_configuration"
  assets := "go/assets"

  // Parse irma_configuration files
  conf, err := parse(path, assets)
  if err != nil {
    printError(err)
    exitCode = 1
    return
  }

  signature, err := parseSignature(cliArgs.signature)
  if err != nil {
    printError(err)
    exitCode = 1
    return
  }

  signatureRequest, err := parseSignatureRequest(cliArgs.signatureRequest)
  if err != nil {
    printError(err)
    exitCode = 1
    return
  }

  result, err := verifyAndSerialize(signature, signatureRequest, conf)
  if err != nil {
    printError(err)
    exitCode = 1
    return
  }
  fmt.Println(result)
}
