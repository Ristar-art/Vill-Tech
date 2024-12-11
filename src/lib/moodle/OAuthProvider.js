import { OAuthProvider, signInWithCredential } from 'firebase/auth';
import axios from 'axios';
import { auth } from '$lib/firebase/firebase';

export class MoodleAuthProvider {
    constructor() {
        this.clientId = import.meta.env.VITE_MOODLE_OAUTH_CLIENT_ID;
        this.clientSecret = import.meta.env.VITE_MOODLE_OAUTH_CLIENT_SECRET;
        this.moodleUrl = import.meta.env.VITE_MOODLE_URL;
        this.redirectUri = `${import.meta.env.VITE_BASE_URL}/auth/moodle/callback`;
    }

    generateAuthUrl() {
        const codeVerifier = this.generateCodeVerifier();
        const codeChallenge = this.generateCodeChallenge(codeVerifier);

        const params = new URLSearchParams({
            client_id: this.clientId,
            redirect_uri: this.redirectUri,
            response_type: 'code',
            scope: 'openid profile email',
            state: crypto.randomUUID(),
            code_challenge: codeChallenge,
            code_challenge_method: 'S256'
        });

        return {
            url: `${this.moodleUrl}/oauth2/authorize?${params.toString()}`,
            codeVerifier
        };
    }

    async exchangeCode(code, codeVerifier) {
        const tokenResponse = await axios.post(
            `${this.moodleUrl}/oauth2/token`,
            new URLSearchParams({
                client_id: this.clientId,
                client_secret: this.clientSecret,
                grant_type: 'authorization_code',
                code,
                redirect_uri: this.redirectUri,
                code_verifier: codeVerifier
            })
        );

        return tokenResponse.data;
    }

    async getUserInfo(accessToken) {
        const response = await axios.get(`${this.moodleUrl}/oauth2/userinfo`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        return response.data;
    }

    generateCodeVerifier() {
        const array = new Uint8Array(32);
        crypto.getRandomValues(array);
        return this.base64URLEncode(array);
    }

    async generateCodeChallenge(verifier) {
        const encoder = new TextEncoder();
        const data = encoder.encode(verifier);
        const array = await crypto.subtle.digest('SHA-256', data);
        return this.base64URLEncode(new Uint8Array(array));
    }

    base64URLEncode(buffer) {
        return btoa(String.fromCharCode.apply(null, [...buffer]))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
    }
}