<template>
    <NavbarComponent />
    <div class="profile-container">
        <div class="profile-card">
            <div class="profile-header">Edit Profile</div>
            <div class="profile-body">
                <div v-if="error" class="profile-error">{{ error }}</div>
                <div v-if="success" class="profile-success">{{ success }}</div>
                <form @submit.prevent="updateProfile">
                    <div class="profile-input-group">
                        <label for="name" class="profile-label">Name</label>
                        <input type="text" id="name" class="profile-input" v-model="profile.name" required>
                    </div>
                    <div class="profile-input-group">
                        <label for="email" class="profile-label">Email</label>
                        <input type="email" id="email" class="profile-input" v-model="profile.email" required>
                    </div>
                    <div class="profile-input-group">
                        <label for="password" class="profile-label">New Password (Optional)</label>
                        <input type="password" id="password" class="profile-input" v-model="newPassword">
                    </div>
                    <button type="submit" class="profile-button">Save Updates</button>
                </form>
            </div>
        </div>
    </div>
    <FooterComponent />
</template>

<script>
import UserService from '../services/UserService';
import NavbarComponent from './NavbarComponent.vue';
import FooterComponent from './FooterComponent.vue';

export default {
    data() {
        return {
            profile: {
                name: '',
                email: ''
            },
            newPassword: '',
            error: null,
            success: null,
        };
    },
    components: {
        NavbarComponent,
        FooterComponent,
    },
    async created() {
        try {
            const response = await UserService.getProfile();
            this.profile = response[0];
        } catch (err) {
            this.error = err.message || 'Gagal mengambil profil.';
        }
    },
    methods: {
        async updateProfile() {
            try {
                await UserService.updateProfile(this.profile, this.newPassword);
                this.success = 'Profil berhasil diperbarui.';
                this.error = null;
                this.newPassword = ''; // Reset password field
            } catch (err) {
                this.error = err.message || 'Gagal memperbarui profil.';
                this.success = null;
            }
        },
    },
};
</script>

<style scoped>
.profile-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    /* Ensure full viewport height */
    padding: 20px;
    font-family: sans-serif;
    background-color: #f8f9fa;
    /* Light background */
}

.profile-card {
    width: 100%;
    max-width: 500px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: white;
    overflow: hidden;
}

.profile-header {
    background-color: #e9ecef;
    /* Light header background */
    padding: 15px;
    text-align: center;
    font-weight: 300;
    font-size: 1.2rem;
    border-bottom: 1px solid #dee2e6;
}

.profile-body {
    padding: 20px;
}

.profile-input-group {
    margin-bottom: 15px;
}

.profile-label {
    display: block;
    margin-bottom: 5px;
    font-size: 0.9rem;
    color: #495057;
}

.profile-input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ced4da;
    border-radius: 4px;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.profile-input:focus {
    border-color: #80bdff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.profile-button {
    width: 100%;
    padding: 12px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.15s ease-in-out;
}

.profile-button:hover {
    background-color: #0056b3;
}

.profile-error,
.profile-success {
    padding: 10px;
    border-radius: 4px;
    margin-bottom: 15px;
    text-align: center;
}

.profile-error {
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
}

.profile-success {
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
}
</style>