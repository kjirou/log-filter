# log-filter [![npm version](https://badge.fury.io/js/log-filter.svg)](http://badge.fury.io/js/log-filter)


## Installation
```bash
npm install -g log-filter
```


## Examples
```bash
export NODE_FILTER_LOG='(warn|error)'
echo '<warn> It is warning' | log-filter
<warn> It is warning
echo '<error> It is a error' | log-filter
<error> It is a error
echo '<log> It is a log' | log-filter  # Not displayed
```

```bash
export NODE_LOG_FILTER_NOT='(warn|error)'
echo '<warn> It is warning' | log-filter  # Not displayed
echo '<error> It is a error' | log-filter  # Not displayed
echo '<log> It is a log' | log-filter
<log> It is a log
```

```bash
export NODE_LOG_FILTER_NOT='log pattern that you do not like read'
npm run start-your-server | log-filter
```

Note:
- `$NODE_LOG_FILTER_NOT` is priority than `NODE_LOG_FILTER`.
