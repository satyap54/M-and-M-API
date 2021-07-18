# M-And-M API

M-And-M is a public api which I built to learn Node, Express. The database includes some of the best verses by Eminem and information about his songs.

## Servers

| Name       | URL                 | Description                                      |
| :--------- | :------------------ | :----------------------------------------------- |
| Production | https://rpi4me.duckdns.org/eminem/  | The primary API server (hosted on my Raspberry Pi) |

##  API Reference
###  Quotes
* ### Get Random Quote
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

* ###  Get A Particular Quote
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
		"song_name" :  string,
		// Id of song in db
		"song_id" : id

	}
	```

	###  Songs
	* ###  List Songs
	Paginated list of songs
	```HTTP
	GET /api/songs
	```
	#### Query parameters

	| param     | type     | Description                                                                                                                                                                                                                                                                                                      |
	| :-------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
	| limit     | `Int`    | `Min: 1` &nbsp; `Max: 20` &nbsp; `Default: 10` <br> Sets the number of results per page.                                                                                                                                                                                                                        |
	| page      | `Int`    | `Min: 1` &nbsp; `Default: 1` <br> The page of results to return. If the value is greater than the total number of pages, request will return an empty response.

	#### Response

	```ts
	{	
		// Length of song array returned
		"count" : Int,

		// Array of songs
		"song" : [
			{
				// Name of the song
				"name" :  string,
				// Id of song in db
				"song_id" : Int
			},
			...
		]
	}
	```

* ###  Get Random Song
	Returns a random song from the database with a persona ( if specified )
	```HTTP
	GET /api/songs/random
	```
	#### Query parameters

	| param     | type     | Description                                                                                                                                                                                                                                                                                                      |
	| :-------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
	| persona  | `String` | Get song with a specified persona. The value can be the motivational rapper `Eminem`, the mischievous alter-ego `SlimShady`, the underdog trailer trash `B-Rabbit` or the sensitive guy `MarshallMathers`.

	#### Response

	```ts
	{	
		// Name of the song
		"name" : String,
		// YT link to the song
		"song_url" : Url,
		// Id of the song in db
		"song_id" : Int,
		// Breakdown of the lyrics by a Youtuber named Knox Hill
		"knox_hill_breakdown" : Url,
		// The one you asked for : [SlimShady, MarshallMathers, Eminem, B-Rabbit]
		"persona" : String
	}
	```

* ###  Get A Particular Song
	Returns a particular song with specified id 
	```HTTP
	GET /api/songs/:song_id
	```
	#### Response

	```ts
	{	
		// Name of the song
		"name" : String,
		// YT link to the song
		"song_url" : Url,
		// Id of the song in db
		"song_id" : Int,
		// Breakdown of the lyrics by a Youtuber named Knox Hill
		"knox_hill_breakdown" : Url,
		// The one you asked for : [SlimShady, MarshallMathers, Eminem, B-Rabbit]
		"persona" : String
	}
	```

## Contribution

All contributions are welcome! I will figure out a way to enable that.
