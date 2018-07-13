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
    apt-get install golang    # For Debian-based Linux distros
    brew install golang       # For OSX
    echo $GOPATH              # Make sure this var points to a directory
```

Build Go executable:
```
    yarn run build-go
```

Initialize and update `irma_configuration` submodule:
```
    git submodule init
    git submodule update
```

Start the app :

```
    yarn run electron-dev
```

Currently the following mail clients are supported / autodetected / tested:

- Thunderbird
- Mail.app (OSX)
- Outlook 2007, Outlook 2010, Outlook 365 (Windows)
