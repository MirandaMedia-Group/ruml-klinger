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
					:href="props.data[activeVideo].video">
					<img
						alt=""
						width="950"
						height="550"
						:src="`https://img.youtube.com/vi/${youtubeID(props.data[activeVideo].video)}/hqdefault.jpg`" />
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
</style>
