GET https://exchange.exodus.io/v3/assets/BTC
App-Name: {{app}}
HTTP 200
[Asserts]
jsonpath "$.id" == "BTC"
jsonpath "$.name" == "Bitcoin"
jsonpath "$.network" == "bitcoin"
jsonpath "$.decimals" == 8
jsonpath "$.symbol" == "BTC"
