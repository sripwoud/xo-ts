GET https://exchange.exodus.io/v3/assets
App-Name: {{app}}
HTTP 200
[Asserts]
jsonpath "$" isCollection
jsonpath "$" count > 50

GET https://exchange.exodus.io/v3/assets
App-Name: {{app}}
[Query]
limit: 10
networks: ethereum
HTTP 200
[Asserts]
jsonpath "$" isCollection
jsonpath "$" count == 10
jsonpath "$[5].network" == "ethereum"
jsonpath "$[4].meta.contractAddress" exists

GET https://exchange.exodus.io/v3/assets
App-Name: {{app}}
[Query]
query: WXMR
HTTP 200
[Asserts]
jsonpath "$" isCollection
jsonpath "$" count == 1
