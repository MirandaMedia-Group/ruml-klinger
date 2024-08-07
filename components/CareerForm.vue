<template>
	<div class="form-wrapper">
		<div class="form-header">
			<h2>{{ $t('contactForm.interestInPosition') }}</h2>
			<a class="project-mail" href="mailto:david@ruml-group.cz"> david@ruml-group.cz </a>
			<a class="project-phone" href="tel:00420777345205"> +420 777 345 205 </a>
		</div>
		<div v-if="dataSending" class="form-sending">{{ $t('contactForm.sending') }}</div>
		<div v-else-if="dataSent" class="form-sent">
			{{ dataSent }}
		</div>
		<div v-else-if="dataError" class="form-error">
			{{ dataError }}
			<div v-for="(item, index) in dataErrorFields" :key="index">
				{{ item.message }}
			</div>
		</div>
		<form v-else @submit.prevent="submitForm">
			<h3>
				{{ $t('contactForm.fullfilForm') }} <small>{{ $t('contactForm.fullfilFormSmall') }}</small>
			</h3>
			<div class="form-group">
				<label for="fullName">{{ $t('contactForm.fullName') }}</label>
				<input type="text" id="fullName" name="fullName" v-model="formValues.fullName" placeholder="Pavel Novotný" />
			</div>
			<div class="form-group">
				<label for="phone">{{ $t('contactForm.phone') }}</label>
				<input type="text" id="phone" name="phone" v-model="formValues.phone" placeholder="724 666 555" />
			</div>
			<div class="form-group">
				<label for="email">{{ $t('contactForm.email') }}</label>
				<input type="email" id="email" name="email" v-model="formValues.email" placeholder="pavel.novotny83@sez|" />
			</div>
			<div class="form-group">
				<label for="file">{{ $t('contactForm.yourCV') }}</label>
				<input type="file" id="file" name="file" ref="formFile" />
			</div>
			<div class="form-group">
				<label for="message">{{ $t('contactForm.message') }}</label>
				<textarea
					id="message"
					name="message"
					v-model="formValues.message"
					rows="5"
					placeholder="Sem napište doplňující informace"></textarea>
			</div>
			<button class="btn btn-tertiary" type="submit">{{ $t('contactForm.send') }}</button>
		</form>
	</div>
</template>
<script setup>
	const formFile = ref(null)
	const formValues = reactive({
		fullName: '',
		email: '',
		phone: '',
		message: '',
	})
	const dataSending = ref(false)
	const dataSent = ref(false)
	const dataError = ref(false)
	const dataErrorFields = ref(false)

	const router = useRouter()

	const endpointURL = 'https://ruml-api.mirandamedia.cz/wp-json/contact-form-7/v1/contact-forms/865/feedback'
	const submitForm = async () => {
		dataSending.value = true
		const formData = new FormData()
		if (formFile.value.files.length) formData.append('cv', formFile.value.files[0])
		formData.append('fullName', formValues.fullName)
		formData.append('email', formValues.email)
		formData.append('phone', formValues.phone)
		formData.append('message', formValues.message)
		formData.append('url', window.location.href)
		formData.append('pozice', router.currentRoute.value.params.slug)

		try {
			const response = await $fetch(endpointURL, {
				method: 'POST',
				body: formData,
			})
			if (response.status === 'mail_sent') {
				dataSending.value = false
				dataSent.value = response.message
			} else {
				dataSending.value = false
				dataError.value = response.message
				dataErrorFields.value = response.invalid_fields
			}
		} catch (e) {
			console.error(e)
			dataSending.value = false
			dataError.value = 'Něco se pokazilo, zkuste to prosím znovu.'
		}
	}
</script>
<style lang="scss" scoped>
	.form-wrapper {
		background-color: $color-white;
		padding: 60px 30px 30px;
		border-top: 4px solid $color-secondary;
		border-radius: 6px;
		background-image: url(/career-form-bg.svg);
		background-repeat: no-repeat;
		background-position: top right;
		width: 100%;
		i h2,
		h3 {
			color: $color-black;
			&::after {
				display: none;
			}
		}
	}
	.form-header {
		border-bottom: 1px solid $color-inactive;
		padding-bottom: 28px;
		margin-bottom: 20px;
		h2 {
			margin-top: 0;
			font-size: rem(32);
		}
		.project-mail,
		.project-phone {
			display: flex;
			align-items: center;
			font-size: rem(16);
			line-height: em(28, 16);
			font-weight: 300;
			color: $color-primary-light;
			text-decoration: none;
			gap: 10px;
		}
		.project-mail {
			margin-bottom: 10px;
		}
		.project-phone {
			&::before {
				content: url(/icon/phone.svg);
				line-height: 0;
			}
		}
	}
	form {
		h3 {
			font-size: rem(24);
			small {
				display: block;
				font-weight: 300;
				font-size: em(16, 24);
				color: $color-font-light;
			}
		}
	}
	button {
		justify-content: center;
		width: 100%;
	}
	@media (max-width: 767px) {
		.form-wrapper {
			padding: 40px 20px;
		}
		.form-header {
			h2 {
				font-size: rem(24);
			}
		}
	}
</style>
