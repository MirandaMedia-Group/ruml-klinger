<template>
	<section class="contact-form" id="formular">
		<div class="container narrow center">
			<h2>{{ $t('contactForm.title') }}</h2>
			<div v-if="dataSending" class="form-sending">
				{{ $t('contactForm.sending') }}
			</div>
			<div v-else-if="dataSent" class="form-sent">
				{{ $t('contactForm.succesfulySent') }}
			</div>
			<div v-else-if="dataError" class="form-error">
				{{ $t('contactForm.error') }}
			</div>
			<form v-else @submit.prevent="submitForm" class="white">
				<p>{{ $t('contactForm.perex') }}</p>
				<div class="form-row">
					<div class="form-group">
						<label for="fullName">{{ $t('contactForm.fullName') }}</label>
						<input type="text" id="fullName" name="fullName" v-model="formValues.fullName" placeholder="Pavel Novotný" />
					</div>
				</div>
				<div class="form-row">
					<div class="form-group">
						<label for="company">{{ $t('contactForm.company') }}</label>
						<input type="text" id="company" name="company" v-model="formValues.company" placeholder="Novotný s.r.o." />
					</div>
				</div>
				<div class="form-row">
					<div class="form-group">
						<label for="email">{{ $t('contactForm.email') }}</label>
						<input type="email" id="email" name="email" v-model="formValues.email" placeholder="pavel.novotny83@sez|" />
					</div>
					<div class="form-group">
						<label for="phone">{{ $t('contactForm.phone') }}</label>
						<input type="text" id="phone" name="phone" v-model="formValues.phone" placeholder="724 666 555" />
					</div>
				</div>
				<div class="form-row">
					<div class="form-group">
						<label for="message">{{ $t('contactForm.message') }}</label>
						<textarea id="message" name="message" rows="5" v-model="formValues.message" placeholder="Vaše zpráva"></textarea>
					</div>
				</div>
				<button class="btn btn-tertiary" type="submit">{{ $t('contactForm.submit') }}</button>
			</form>
		</div>
	</section>
</template>
<script setup>
	const formValues = reactive({
		fullName: '',
		company: '',
		email: '',
		phone: '',
		message: '',
	})
	const dataSending = ref(false)
	const dataSent = ref(false)
	const dataError = ref(false)

	const router = useRouter()

	const endpointURL = 'https://ruml-api.mirandamedia.cz/wp-json/contact-form-7/v1/contact-forms/866/feedback'
	const submitForm = async () => {
		dataSending.value = true
		const formData = new FormData()
		formData.append('fullName', formValues.fullName)
		formData.append('email', formValues.email)
		formData.append('phone', formValues.phone)
		formData.append('message', formValues.message)
		formData.append('company', formValues.company)

		try {
			const response = await $fetch(endpointURL, {
				method: 'POST',
				body: formData,
			})
			if (response.status === 'mail_sent') {
				dataSending.value = false
				dataSent.value = true
			} else {
				dataSending.value = false
				dataError.value = true
			}
		} catch (e) {
			dataSending.value = false
			dataError.value = true
		}
	}
</script>
<style lang="scss" scoped>
	.contact-form {
		margin: 0;
		padding: 60px 0;
		background: url(/contact-form-bg.jpg) no-repeat center center;
		background-size: cover;
		form p {
			margin-bottom: 40px;
		}
	}
	button {
		justify-content: center;
		width: 100%;
	}
</style>
