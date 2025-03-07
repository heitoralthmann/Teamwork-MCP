import minimist from 'minimist';
// Parse command line arguments
const argv = minimist(process.argv.slice(2), {
    string: ['teamwork-api-url', 'teamwork-username', 'teamwork-password'],
    alias: {
        'url': 'teamwork-api-url',
        'user': 'teamwork-username',
        'pass': 'teamwork-password'
    }
});
console.log('Command line arguments:');
console.log('--teamwork-api-url:', argv['teamwork-api-url'] || 'Not provided');
console.log('--teamwork-username:', argv['teamwork-username'] || 'Not provided');
console.log('--teamwork-password:', argv['teamwork-password'] ? '******' : 'Not provided');
// Check environment variables
console.log('\nEnvironment variables:');
console.log('TEAMWORK_API_URL:', process.env.TEAMWORK_API_URL || 'Not set');
console.log('TEAMWORK_USERNAME:', process.env.TEAMWORK_USERNAME || 'Not set');
console.log('TEAMWORK_PASSWORD:', process.env.TEAMWORK_PASSWORD ? '******' : 'Not set');
// Set environment variables from command line arguments if provided
if (argv['teamwork-api-url']) {
    process.env.TEAMWORK_API_URL = argv['teamwork-api-url'];
    console.log('\nSet TEAMWORK_API_URL from command line argument');
}
if (argv['teamwork-username']) {
    process.env.TEAMWORK_USERNAME = argv['teamwork-username'];
    console.log('Set TEAMWORK_USERNAME from command line argument');
}
if (argv['teamwork-password']) {
    process.env.TEAMWORK_PASSWORD = argv['teamwork-password'];
    console.log('Set TEAMWORK_PASSWORD from command line argument');
}
// Final environment variables
console.log('\nFinal environment variables:');
console.log('TEAMWORK_API_URL:', process.env.TEAMWORK_API_URL || 'Not set');
console.log('TEAMWORK_USERNAME:', process.env.TEAMWORK_USERNAME || 'Not set');
console.log('TEAMWORK_PASSWORD:', process.env.TEAMWORK_PASSWORD ? '******' : 'Not set');
