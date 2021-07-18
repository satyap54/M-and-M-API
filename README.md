# M-And-M API

M-And-M is a public api which I built to learn Node, Express. The database includes some of the best verses by Eminem and information about his songs.

## Servers

| Name       | URL                 | Description                                      |
| :--------- | :------------------ | :----------------------------------------------- |
| Production | https://rpi4me.duckdns.org/eminem/  | The primary API server (hosted on my Raspberry Pi) |

##  API Reference
###  Quotes
####  Get Random Quote
Returns a random quote from the database
```HTTP
GET /api/quotes/random
```
#### Response

```ts
{
	// The quotation text
	"quote" :  content,
	// Id of the quote object
	"quote_id" :  _id,
	// Song from which this quotation is taken
	"song" : "<song_id> <song_name>"

}
```

####  Get A Particular Quote
Returns a particular quote with specified id 
```HTTP
GET /api/quotes/:quote_id
```
#### Response

```ts
{
	// The quotation text
	"content" :  content,
	// Song from which this quotation is taken
	"song_name" :  ,
	// Id of song in db
	"song" : "<song_id> <song_name>"

}
```
