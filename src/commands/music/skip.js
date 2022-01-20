/**
 * @author Benjamin Guirlet
 * @author Lothaire Guée
 * @description
 *      Handler for the command 'forceskip'.
 */


const { checkUserIsConnected } = require( "../../utils/voiceUtils" );

const { SlashCommandBuilder } = require( "@discordjs/builders" );
const { CommandInteraction, Client, MessageEmbed } = require( "discord.js" );
const { Music } = require("../../files/modules");



const slashCommand = new SlashCommandBuilder()
	.setName( "m_skip" )
	.setDescription( "[music] Passe à la musique suivante sans proposer de vote." );

	
/* ----------------------------------------------- */
/* PERMISSIONS                                     */
/* ----------------------------------------------- */

async function permissions(guild){
	const permissions = [
		{
			id: guild,
			type: 'ROLE',
			permission: true,
		},
	];
	return permissions;
}

/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
/**
 * The commands function. It is executed when the slash command is called.
 * @param {CommandInteraction} interaction The interaction generated by the command execution.
 */
async function execute( interaction ) {
	if(Music == false) return;
	if ( !(await checkUserIsConnected( interaction )) ) return;

	let client = interaction.client;

	const guildId = interaction.guildId;
	if ( client.guildsData.has( guildId ) ) {
		client.guildsData.get( guildId ).player.stop();
		await interaction.reply( {
			embeds: [
				new MessageEmbed()
					.setColor( '#e15dd9' )
					.setAuthor( "┃ Passage à la musique suivante !", interaction.user.avatarURL() )
			]
		});
	}
	else {
		await interaction.reply({
			embeds: [
				new MessageEmbed()
					.setColor( '#e15dd9' )
					.setAuthor( "┃ Le bot n'est pas connecté à un vocal !", interaction.user.avatarURL() )
			]
		});
	}
}


/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */
module.exports = {
	data: slashCommand,
	permissions,
	execute
}