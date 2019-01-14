const users = [{
	id: '1',
	name: 'memphis',
	email: 'cj@cj.com'
},
{
	id: '2',
	name: 'binary',
	email: 'binary@mashmello.com'
}, 
{
	id: '3',
	name: 'collo',
	email: 'cj@cjmash.com'
}
	]
	const comments = [{
		id: '10',
		text: 'this is a book recomended for over 18 people',
		author: '1',
		post: '2'
	},
	{
		id: '29',
		text: 'I would recomment it',
		author: '2',
		post: '1'
	}, 
	{
		id: '33',
		text: 'love this book',
		author: '1',
		post: '1'
	}
		]
	const posts = [{
		id: '1',
		title: 'run',
		body: 'lorem ipsum dollar',
		published: true,
		author: '3'
	},
	{
		id: '2',
		title: 'run to timbuktu',
		body: 'isset manupus iso late',
		published: false,
		author: '1'
	}, 
	{
		id: '3',
		title: 'filo filo lorem ipsum dollar ',
		body: 'filo lorem ipsum dollar  ipsum dollar',
		published: true,
		author: '2'
	}
    ]
    
    const db = {
      users,
      posts,
      comments
    }

    export { db  as default }