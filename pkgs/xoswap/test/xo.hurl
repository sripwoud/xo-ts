GET https://exchange.exodus.io/v3/pairs
App-Name: {{app}}

[Query]
from: BTC

HTTP 200
[Asserts]
jsonpath "$[*]" count > 10

GET https://exchange.exodus.io/v3/pairs
HTTP 401
[Asserts]
jsonpath "$.details" == "missing authentication"


GET https://exchange.exodus.io/v3/pairs/BTC_ETH
App-Name: {{app}}
HTTP 200
[Asserts]
jsonpath "$.from" == "BTC"
jsonpath "$.to" == "ETH"
jsonpath "$.id" == "BTC_ETH"
