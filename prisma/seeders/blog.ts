import prisma from "../../src/utils/prisma";


export const seedBlog =async () => {
    const indoorPlantBlog = await prisma.indoorPlantBlog.create({
        data: {},
      });
    
      const outdoorPlantBlog = await prisma.outdoorPlantBlog.create({
        data: {},
      });
    
      const otherPlantBlog = await prisma.otherPlantBlog.create({
        data: {},
      });
    
     
      const blogPosts = [
        {
          title: 'Indoor Plants for Beginners',
          content: 'Indoor plants can bring life to your home. Here are some easy-to-care-for options...',
          name: 'John Doe',
          imageUrl: '',
          categoryType: 'INDOOR',
        },
        {
          title: 'Top Outdoor Plants for Your Garden',
          content: 'Transform your garden with these beautiful outdoor plants...',
          name: 'Jane Smith',
          imageUrl: '',
          categoryType: 'OUTDOOR',
        },
        {
          title: 'Unique Plants You Should Consider',
          content: 'Looking for something different? Check out these unique plants...',
          name: 'Alice Johnson',
          imageUrl: '',
          categoryType: 'OTHER',
        },
      ];
    
    for (let i = 0; i < 4; i++){
        for (const post of blogPosts) {
            let blogPostData: any = {
              title: `${post.title}${i+1}`,
              content: post.content,
              name: post.name,
              imageUrl: post.imageUrl,
              categoryType: post.categoryType,
            };
        
            if (post.categoryType === 'INDOOR') {
              blogPostData.indoorPlantBlogId = indoorPlantBlog.id;
            } else if (post.categoryType === 'OUTDOOR') {
              blogPostData.outdoorPlantBlogId = outdoorPlantBlog.id;
            } else if (post.categoryType === 'OTHER') {
              blogPostData.otherPlantBlogId = otherPlantBlog.id;
            }
            await prisma.blogPost.create({
              data: blogPostData,
            });
    }}
}