const PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
const CONST = require('../Config/consts');
const KEYS = require('../Config/env-keys');

personalityInsights = texto => {
	console.log('DENTRO');
	const personalityInsights = new PersonalityInsightsV3(KEYS.PERSONALITY);

	let profileParams = {
		// Get the content from the JSON file.
		content: `null@lobaoelecicus Avol VITORY, IF YOUR THEY! After decades, Brazil finally has the chance to elect a president who truly carries the values of the Brazilians, " said the source. Let us together change our nation's rumours! Let's vote Jair Bolsonaro president 17! A strong embrace to all and even victory, God willing! https://t.co/bFn17omhAp The choice is with Brazil! https://t.co/5cTz1IDPxQ https://t.co/yvI9KznFUU https://t.co/G9Nbq9AftS RT @FlavioBolsonaro: Our solidarity with the Jewish people in this abominable act of anti-Semitic. And our feelings for the relatives of those who were ... the last pre-second live. The future is in the hands of the Brazilians. Full link on youtube. https://t.co/QfYKbbt3Lz If it is God's will, tomorrow will be the day of our new independence. We are going to defeat the party of the biggest corruption scandals in history, the Petrolão, the Mensalon, the Foro of SP, the enemies of freedom and the Constitution! We will return Brazil to the Brazilians of good!THE LAST MOMENT! VAMOS ALL JUNTOS! https://t.co/3S2AU4hv9e Today, 27/10, at 18: 30h, we'll make the last live before the Elections. Time to come together and let us know about the future that is at stake. We have two options: the change and prosperity or the mesmice of those who broke, robbed and led Brazil into chaos and violence. Until then!Exciting to feel the hope of the Brazilians! I regret not being closer to the medical limitations after being attempted to murder by a former PSOL militant, PT's arm, but we trust and listen to Brazil! LEMBREM-SE NOTHING IS GANE! Strength to the end!MST's DEMOCRACY, UNE and other outsiders: leftist militants, challenge justice and do act by calling Judge Moro de corrupt: https://t.co/weD189XfNA On their social media, Joaquim barbosa is already in the story that he himself said only Bolsonaro was not bought by PT in the corruption scheme known as Mensalon, which gravely ferns our country's democracy by voicing the legislature. https://t.co/79dRHsvGwH Worthless Worker shows the reality of violence in the Brazil. https://t.co/1invULEyD5 Thank you for your support with the hashtag #MudaBrasil17. First place in Brazil and second in the world! Every citizen, to enjoy his full rights, must obey the laws and comply with his duties. Anyone on the national territory, even if not a Brazilian citizen, has inalienable rights as a human being, as well as having the duty to obey the laws of Brazil.Good morning, FAMILY and PRIVATE PROPERTY: https://t.co/PI2SJvdxOZ We have little to gain from our new independence ; the first step towards the country of justice, employment, security and freedom. I ask you, in your heart, to remain engaged, showing that we have the best proposal to the end and staring at the lies of my opponent! Stay with God!Luciano Camargo and Family Visit Bolsonaro. A very frank and cool chat. https://t.co/Qumohc2X1t received support from the Federation of Domestic Workers' Employees and Employees. It highlights our extreme sincerity and attention always given to visits to my office, and the demagoguery of PT, who has always said she represents the class, but deceived her. Look at the document: https://t.co/TEidHkIP9E The way we change Brazil will be through the protection of laws and obedience to the Constitution, so, NOVELLY, we'll make sure we do everything in the form of the law! Any form of differentiation between Brazilians cannot be admitted. Every citizen will have his rights preserved.`,
		content_type: 'text/plain',
		consumption_preferences: true,
		raw_scores: true
	};

	personalityInsights.profile(profileParams, function(error, profile) {
		if (error) {
			console.log(error);
		} else {
			console.log(JSON.stringify(profile, null, 2));
		}
	});
};

personalityInsights('ola');
