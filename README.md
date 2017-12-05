# IRMA Signature app

An application for creating IRMA signature requests and sending them to an e-mail client.

## How to use it

Make sure you have NodeJS, npm and Yarn installed (Yarn can be installed by 'npm install -g yarn').

Install dependencies:
```
    yarn
```

Install Golang compiler and verify GOPATH:

```
    apt-get install golang    # For debian-based Linux distros
    echo $GOPATH              # Make sure this var points to a directory
```

Build Go executable:
```
    yarn run build-get-go
```

Start the app:

```
    yarn run dev
```
