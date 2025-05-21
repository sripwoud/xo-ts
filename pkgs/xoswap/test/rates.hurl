GET https://exchange.exodus.io/v3/pairs/BTC_ETH/rates
App-Name: {{app}}
HTTP 200
[Asserts]
jsonpath "$" isCollection
jsonpath "$" count > 2
jsonpath "$[0].amount.assetId" == "ETH"
jsonpath "$[0].amount.value" isNumber
jsonpath "$[0].expiry" isInteger
jsonpath "$[0].id" isString
