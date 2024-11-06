export const getVideosQuery = (skip = 0) => `
	query video {
		allUploads(first: 100, skip: ${skip * 100}, filter: {type: {eq: video}}) {
			url
      size
      video {
        duration
        width
        height
      }
		}
	}
`;

export const getImagesQuery = (skip = 0) => `
    query VideoOrAudio {
        allUploads(first: 100, skip: ${skip * 100}, filter: {type: {eq: image}}) {
					avif: url(imgixParams: {fm: avif})
					webp: url(imgixParams: {fm: webp})
					png: url(imgixParams: {fm: png})
					svg: url
        }
    }
`;

export const getCount = type => `
query countUploads {
  _allUploadsMeta(filter: {type: {eq: ${type}}}) {
    count
  }
}
`;
