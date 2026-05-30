import { defineField, defineType } from 'sanity';

export const highlightsSection = defineType({
	name: 'highlightsSection',
	title: 'Highlights section',
	type: 'object',
	options: {
		collapsible: true,
		collapsed: false
	},
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'items',
			title: 'Items',
			type: 'array',
			of: [
				{
					type: 'object',
					name: 'highlightItem',
					title: 'Highlight item',
					preview: {
						select: {
							title: 'tag',
							mediaType: 'mediaType',
							image: 'image',
							thumbnail: 'videoThumbnail'
						},
						prepare({ title, mediaType, image, thumbnail }) {
							return {
								title: title || 'Untitled highlight',
								subtitle: mediaType === 'video' ? 'Video highlight' : 'Image highlight',
								media: mediaType === 'video' ? thumbnail : image
							};
						}
					},
					fields: [
						defineField({
							name: 'tag',
							title: 'Tag',
							type: 'string',
							validation: (Rule) => Rule.required()
						}),
						defineField({
							name: 'mediaType',
							title: 'Media type',
							type: 'string',
							initialValue: 'image',
							options: {
								layout: 'radio',
								list: [
									{ title: 'Image', value: 'image' },
									{ title: 'Video', value: 'video' }
								]
							},
							validation: (Rule) => Rule.required()
						}),
						defineField({
							name: 'image',
							title: 'Image',
							type: 'imageWithAlt',
							hidden: ({ parent }) => parent?.mediaType === 'video',
							validation: (Rule) =>
								Rule.custom((value, context) => {
									const parent = context.parent as { mediaType?: string };
									return parent?.mediaType === 'image' && !value ? 'Image is required.' : true;
								})
						}),
						defineField({
							name: 'videoFile',
							title: 'Video file',
							description: 'Upload an MP4 or MOV file for the carousel modal.',
							type: 'file',
							options: {
								accept: 'video/mp4,video/quicktime,.mov'
							},
							hidden: ({ parent }) => parent?.mediaType !== 'video',
							validation: (Rule) =>
								Rule.custom((value, context) => {
									const parent = context.parent as { mediaType?: string };
									return parent?.mediaType === 'video' && !value ? 'Video file is required.' : true;
								})
						}),
						defineField({
							name: 'videoThumbnail',
							title: 'Video thumbnail',
							description:
								'Optional. Shown in the carousel before the video opens. If empty, the site uses a frame from the video.',
							type: 'imageWithAlt',
							hidden: ({ parent }) => parent?.mediaType !== 'video'
						})
					]
				}
			],
			validation: (Rule) => Rule.min(1)
		})
	]
});
