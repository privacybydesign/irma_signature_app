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

### Note on windows

For windows, copy go\\irma\_configuration to public\\irma\_configuration to compensate for the fact that windows does not support symlinks.

## Building distributable binaries

Follow the setup instructions above. Then build optimized javascript
```
    yarn build
```

And build the desired distribution using electron-builder
```
    ./node\_modules/node\_modules/.bin/electron-builder
```
