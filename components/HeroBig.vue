<template>
	<section
		class="hero"
		:class="{ white: props.white, center: props.center, nowrap: props.nowrap }">
		<NuxtPicture
			v-if="props.heroType === 'img'"
			:src="image.sourceUrl"
			:width="image.mediaDetails.width"
			:height="image.mediaDetails.height"
			:alt="image.altText"
			:img-attrs="{ style: 'display: block; height: 100%; object-fit: cover;' }"
			provider="ipx" />
		<div
			class="video-wrapper"
			v-else-if="props.heroType === 'video'">
			<video
				:src="props.video.mediaItemUrl"
				autoplay
				playsinline=""
				preload=""
				muted
				style="width: 100%"
				loop></video>
		</div>
		<div class="container">
			<div class="content">
				<h1>{{ props.title }}</h1>
				<div
					v-if="props?.perex"
					class="excerpt"
					v-html="props?.perex"></div>
				<div
					v-if="props?.contactBox"
					class="contact-box">
					<div class="phone">
						<svg
							width="24"
							height="25"
							viewBox="0 0 24 25"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M20.9638 16.9765V19.6862C20.9648 19.9377 20.9133 20.1867 20.8125 20.4172C20.7117 20.6477 20.5639 20.8546 20.3786 21.0247C20.1932 21.1947 19.9743 21.3242 19.736 21.4048C19.4978 21.4854 19.2452 21.5153 18.9947 21.4927C16.2153 21.1907 13.5455 20.2409 11.1997 18.7197C9.01735 17.3329 7.16706 15.4827 5.78028 13.3003C4.25379 10.9439 3.30381 8.26107 3.00733 5.46915C2.98476 5.21938 3.01444 4.96764 3.09449 4.72996C3.17454 4.49229 3.30321 4.27389 3.47229 4.08866C3.64137 3.90343 3.84717 3.75544 4.07658 3.65411C4.30599 3.55278 4.55399 3.50032 4.80478 3.50009H7.51451C7.95286 3.49577 8.37782 3.651 8.71019 3.93683C9.04255 4.22267 9.25964 4.61961 9.32099 5.05366C9.43536 5.92084 9.64747 6.77229 9.95326 7.59177C10.0748 7.91507 10.1011 8.26642 10.0291 8.6042C9.95701 8.94198 9.78965 9.25203 9.5468 9.49761L8.39969 10.6447C9.6855 12.906 11.5578 14.7784 13.8191 16.0642L14.9663 14.9171C15.2118 14.6742 15.5219 14.5069 15.8597 14.4348C16.1975 14.3628 16.5488 14.3891 16.8721 14.5106C17.6916 14.8164 18.543 15.0285 19.4102 15.1429C19.849 15.2048 20.2497 15.4258 20.5361 15.7639C20.8226 16.1019 20.9748 16.5335 20.9638 16.9765Z"
								stroke="#D70C38"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round" />
						</svg>
						<div>
							<span>Centrála</span>
							<a href="tel:00733439135">+420 733 439 135</a>
						</div>
					</div>
					<div class="mail">
						<svg
							width="20"
							height="17"
							viewBox="0 0 20 17"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M2.8 1H17.2C18.19 1 19 1.81 19 2.8V13.6C19 14.59 18.19 15.4 17.2 15.4H2.8C1.81 15.4 1 14.59 1 13.6V2.8C1 1.81 1.81 1 2.8 1Z"
								stroke="#D70C38"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round" />
							<path
								d="M19 2.80005L10 9.10005L1 2.80005"
								stroke="#D70C38"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round" />
						</svg>

						<div>
							<span>Centrála</span>
							<a href="mailto:ruml@ruml-group.cz">ruml@ruml-group.cz</a>
						</div>
					</div>
				</div>
				<div
					v-if="btnPrimary && btnSecondary"
					class="buttons-vertical">
					<NuxtLink
						v-if="btnPrimary.type === 'internal' && btnPrimary.urlInternal"
						:to="btnPrimary.urlInternal"
						class="btn btn-primary">
						{{ btnPrimary.text }}
					</NuxtLink>
					<a
						v-else-if="btnPrimary.type === 'external' && btnPrimary.urlExternal"
						:href="btnPrimary.urlExternal"
						class="btn btn-primary"
						target="_blank">
						{{ btnPrimary.text }}
					</a>
					<BtnSecondary
						v-if="btnSecondary.urlInternal || btnSecondary.urlExternal"
						:type="btnSecondary.type"
						:href="btnSecondary.type === 'internal' ? btnSecondary.urlInternal : btnSecondary.urlExternal">
						{{ btnSecondary.text }}
					</BtnSecondary>
				</div>
			</div>
		</div>
	</section>
</template>
<script setup>
	const props = defineProps([
		'title',
		'perex',
		'btnPrimary',
		'btnSecondary',
		'image',
		'white',
		'center',
		'contactBox',
		'nowrap',
		'heroType',
		'video',
	])
	console.log(props)
</script>
<style lang="scss" scoped>
	.hero {
		position: relative;
		&.white {
			h1,
			.excerpt {
				color: $color-white;
			}
		}
		&.center {
			text-align: center;
			.container {
				justify-content: center;
			}
		}
		&.nowrap {
			height: 580px;
		}
		h1 {
			font-size: clamp(rem(30), 3vw, rem(42));
		}
		.video-wrapper {
			position: relative;
			&::after {
				content: '';
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				background: linear-gradient(92.48deg, #dbeffa 27.55%, rgba(219, 239, 250, 0.21) 63.5%);
			}
		}
	}
	.container {
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		height: 100%;
		display: flex;
		align-items: center;
	}
	.content {
		max-width: 600px;
	}
	.subheading {
		color: $color-secondary;
		font-weight: 700;
		text-transform: uppercase;
		font-size: rem(24);
		line-height: em(27, 24);
		margin-bottom: em(30, 24);
	}
	.excerpt {
		font-size: rem(20);
		line-height: em(36, 20);
		margin: 0;
	}
	.contact-box {
		background-color: rgba(22, 22, 23, 0.3);
		display: flex;
		flex-wrap: wrap;
		gap: 40px;
		padding: 20px;
		color: $color-white;
		& > div {
			display: flex;
			align-items: center;
			gap: 10px;
			& > div {
				display: flex;
				flex-direction: column;
				text-align: left;
				span {
					font-size: rem(12);
					line-height: em(18, 12);
				}
				a {
					color: $color-white;
					text-decoration: none;
					font-size: rem(24);
					font-weight: 700;
				}
			}
		}
	}
	@media (max-width: 991px) {
		.hero:not(.nowrap) {
			.container {
				position: initial;
				transform: none;
			}
			.content {
				max-width: unset;
				padding: 40px 0;
			}
		}
		.hero .video-wrapper::after {
			display: none;
		}
		.hero.white:not(.nowrap) {
			h1 {
				color: $color-primary;
			}
			.excerpt {
				color: $color-black;
			}
			.container {
				background-color: $color-bg;
			}
		}
	}
	@media (max-width: 767px) {
		.excerpt {
			font-size: 1rem;
		}
		.contact-box {
			gap: 20px;
		}
	}
</style>
