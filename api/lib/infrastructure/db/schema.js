
// fill in the db with default data  


exports.schema = userid => {
	return {
		user_id : `${userid}`,
		categories: {
			uncategorized : [
				"https://nomadlist.com/",
				"https://teleport.org/",
				"https://bkpk.me/",
				"https://www.udacity.com/",
				"http://execbit.ru/",
				"https://www.lexaloffle.com/bbs/?tid=29353"
			],
			movies: [
				"https://www.imdb.com/title/tt7131622/", 
				"https://www.imdb.com/title/tt8367814/",
				"https://www.imdb.com/title/tt7286456/"
			],
			music: [
				"https://www.discogs.com/Radiohead-OK-Computer/master/21491",
				"https://www.discogs.com/Prince-And-The-Revolution-Purple-Rain/master/16245",
				"https://www.discogs.com/Daft-Punk-Random-Access-Memories/master/556257"
			]
		}
	};
};