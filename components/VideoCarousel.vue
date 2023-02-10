<template>
	<div
		class="video__carousel"
		:class="{ white: props.white }">
		<div class="video__info">
			<div class="video__description">
				<h2>{{ props.data[activeVideo].title }}</h2>
				<p>{{ props.data[activeVideo].description }}</p>
			</div>
			<div class="carousel__controls">
				<div class="carousel__dots">
					<button
						v-for="(item, index) in props.data"
						:key="index"
						:class="{ active: index === activeVideo }"
						class="carousel__dot"
						@click="activeVideo = index"
						name="Slide"></button>
				</div>
				<div class="carousel__arrows">
					<button
						class="arrow arrow-left"
						@click="activeVideo = activeVideo === 0 ? props.data.length - 1 : activeVideo - 1"
						name="Předchozí">
						<svg
							width="19"
							height="15"
							viewBox="0 0 19 15"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M1.5 7.5L17.5 7.5M17.5 7.5L11 14M17.5 7.5L11 0.999999"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round" />
						</svg>
					</button>
					<button
						class="arrow arrow-right"
						@click="activeVideo = activeVideo === props.data.length - 1 ? 0 : activeVideo + 1"
						name="Další">
						<svg
							width="19"
							height="15"
							viewBox="0 0 19 15"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M1.5 7.5L17.5 7.5M17.5 7.5L11 14M17.5 7.5L11 0.999999"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round" />
						</svg>
					</button>
				</div>
			</div>
		</div>
		<div class="video__content">
			<video
				v-if="props.data[activeVideo].file"
				:src="props.data[activeVideo].file"></video>
			<div v-else-if="props.data[activeVideo].video">
				<a
					v-if="props.data[activeVideo].video && !showVideo"
					@click.prevent="showVideo = true"
					:data-youtube="youtubeID(props.data[activeVideo].video)"
					:href="props.data[activeVideo].video"
					class="video-link-image">
					<img
						alt=""
						width="950"
						height="550"
						loading="lazy"
						:src="`https://img.youtube.com/vi/${youtubeID(props.data[activeVideo].video)}/hqdefault.jpg`" />
					<svg
						id="play-button"
						width="130"
						height="130"
						viewBox="0 0 130 130"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<g opacity="0.5">
							<circle
								cx="65"
								cy="65"
								r="60"
								stroke="white"
								stroke-width="10" />
							<path
								d="M86.375 63.268C87.7083 64.0378 87.7083 65.9623 86.375 66.7321L55.8125 84.3773C54.4792 85.1471 52.8125 84.1849 52.8125 82.6453L52.8125 47.3547C52.8125 45.8151 54.4792 44.8529 55.8125 45.6227L86.375 63.268Z"
								fill="white" />
						</g>
					</svg>
				</a>
				<iframe
					v-else
					width="960"
					height="550"
					:src="`https://www.youtube-nocookie.com/embed/${youtubeID(props.data[activeVideo].video)}?autoplay=1`"
					title="YouTube video player"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					allowfullscreen></iframe>
			</div>
		</div>
	</div>
</template>
<script setup>
	const props = defineProps(['data', 'white'])
	const activeVideo = useState('activeVideo', () => 0)
	const showVideo = useState('showVideo', () => false)

	// COMPUTED
	const youtubeID = (videoURL) => new URL(videoURL).searchParams.get('v')
</script>
<style lang="scss" scoped>
	.video__carousel {
		display: flex;
		gap: 30px;
		.video__info {
			flex: 450;
			display: flex;
			flex-direction: column;
			gap: 20px;
		}
		.video__content {
			flex: 960;
		}
		&.white {
			color: $color-white;
			h2,
			p {
				color: $color-white;
			}
			.carousel__arrows {
				svg {
					stroke: $color-white;
				}
			}
		}
	}
	.video__description {
		margin-top: auto;
		margin-bottom: auto;
		h2 {
			&::after {
				margin-left: 0;
			}
		}
		p {
			font-size: rem(20);
			color: rgba($color-font, 0.9);
		}
	}
	.video__content {
		iframe,
		video,
		a,
		img {
			display: block;
		}
		.video-link-image {
			position: relative;
			max-height: 550px;
			overflow: hidden;
			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
			#play-button {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
			}
		}
	}
	.carousel__controls {
		display: flex;
		align-items: center;
		gap: 20px;
		justify-content: space-between;
	}
	.carousel__dots {
		display: flex;
		gap: 20px;
	}
	.carousel__dot {
		display: block;
		width: 24px;
		height: 24px;
		border-radius: 50%;
		background-color: $color-inactive;
		&.active {
			background-color: $color-secondary;
		}
	}
	.carousel__arrows {
		display: flex;
		gap: 10px;
		.arrow {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 44px;
			height: 44px;
			border: 1px solid $color-font-light;
			cursor: pointer;
			svg {
				stroke: $color-black;
			}
			&:hover,
			&:focus {
				border-color: $color-secondary;
				svg {
					stroke: $color-secondary;
				}
			}
		}
		.arrow-left {
			svg {
				transform: rotate(180deg);
			}
		}
	}
	@media (max-width: 900px) {
		.video__carousel {
			flex-direction: column-reverse;
		}
	}
	@media (max-width: 767px) {
		.video__description {
			p {
				font-size: 1rem;
			}
		}
	}
</style>
