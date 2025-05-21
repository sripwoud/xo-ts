GET https://exchange.exodus.io/v3/pairs
App-Name: {{app}}
[Query]
from: BTC
HTTP 200
[Asserts]
jsonpath "$" isCollection
jsonpath "$" count > 10

GET https://exchange.exodus.io/v3/pairs
HTTP 401
[Asserts]
jsonpath "$.details" == "missing authentication"
