module.exports = {
    generateToken() {
        let result = '';
        const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < 40; i++) {
            result += possible[Math.floor(Math.random() * possible.length)];
        }

        return result;
    }
}
