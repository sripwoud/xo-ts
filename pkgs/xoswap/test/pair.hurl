GET https://exchange.exodus.io/v3/pairs/BTC_ETH
App-Name: {{app}}
HTTP 200
[Asserts]
jsonpath "$.from" == "BTC"
jsonpath "$.to" == "ETH"
jsonpath "$.id" == "BTC_ETH"
