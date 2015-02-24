# log-filter [![npm version](https://badge.fury.io/js/log-filter.svg)](http://badge.fury.io/js/log-filter)


## Installation
```bash
npm install -g log-filter
```


## Usage
```bash
log-filter [--contain -c KEYWORD] [--match -m REG_EXP] [--not -n]
```

### --contain, -c
```bash
echo 'warn: It is warning' | log-filter --contain warn
warn: It is warning
echo 'warn: It is warning' | log-filter --contain error  # Not displayed
```

### --match, -m
```bash
echo 'warn: It is warning' | log-filter --match '(warn|error)'
warn: It is warning
```

- Note: `--match` is priority than `--contain`.

### --not, -n
```bash
echo 'warn: It is warning' | log-filter --contain error --not
warn: It is warning
echo 'warn: It is a error' | log-filter --contain error --not  # Not displayed
```


## Examples
```bash
npm run start-your-server | log-filter -n -m 'log pattern that you do not like reading'
```
