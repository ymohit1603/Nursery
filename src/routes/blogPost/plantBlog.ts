import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { comment, plantSchema } from "../../utils/zodValidation";
import { isAuthenticated } from "../../middleware/auth";

const router = express.Router();
const prisma = new PrismaClient();

// Return all indoor plants
router.get("/indoor",async (req: Request, res: Response) => {
  try {
    const plants = await prisma.blogPost.findMany({
      where: {
        indoorPlantBlogId: {
          not: null,
        },
      },
    });
    res.status(200).json({plants: plants ,message:"success"});
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: "Internal Server error" });
  }
});

// Return all outdoor plants
router.get("/outdoor",async (req: Request, res: Response) => {
  try {
    const plants = await prisma.blogPost.findMany({
      where: {
        outdoorPlantBlogId: {
          not: null,
        },
      },
    });
    res.status(200).json({plants: plants ,message:"success"});
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: "Internal Server error" });
  }
});

// Return all other plants
router.get("/other",async (req: Request, res: Response) => {
  try {
    const plants = await prisma.blogPost.findMany({
      where: {
        otherPlantBlogId: {
          not: null,
        },
      },
    });
    res.status(200).json({plants: plants ,message:"other plants"});
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: "Internal Server error" });
  }
});

// // Create new plant
// router.post("/", async (req: Request, res: Response) => {
//   const result = plantSchema.safeParse(req.body);

//   if (!result.success) {
//     return res.status(400).json(result.error.errors);
//   }

//   const { name, category, description } = result.data;

//   try {
//     const newPlant = await prisma.plant.create({
//       data: {
//         name,
//         category,
//         description: description || "",
//       },
//     });
//     res.status(201).json({ message: "Plant created", newPlant });
//   } catch (error) {
//     console.error(error); 
//     res.status(500).json({ message: "Internal server error" });
//   }
// });


// Return recently created blog posts
router.get("/recent", async (req: Request, res: Response) => {
  try {
    const recentPosts = await prisma.blogPost.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 5,
    });
    res.status(200).json({ recentPosts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server error" });
  }
});

// Get blogPost by id
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  
  if (!id) {
    return res.status(400).json({ error: "Plant ID is required" });
  }

  try {
    const plantId = parseInt(id);
    if (isNaN(plantId)) {
      return res.status(400).json({ error: "Invalid Plant ID" });
    }

    const singlePlant = await prisma.blogPost.findUnique({
      where: {
        id: plantId,
      },
      include:{
        comments:true
      }
    });

    if (!singlePlant) {
      return res.status(404).json({ error: "Plant not found" });
    }

    const plants = singlePlant;

    res.status(200).json({ plants });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: "Internal Server error" });
  }
});


//render all comments
router.get('/comment',async (req, res) => {
  const { pId } = req.body;
  try {
    const comment=await prisma.blogComment.findMany({
      where: {
        postId:pId
      },
    })

    return res.status(200).json({ comment });
  }
  catch (e) {
    return res.status(500).json({ message: "Internal server error" });
  }
})


// add comment to post
router.post('/comment', isAuthenticated, async (req, res) => {
  console.log(req.body);
  const parsedBody = comment.safeParse(req.body);
  if (!parsedBody.success) {
    console.log('error in parsing');
    return res.status(400).json({ errors: parsedBody.error.errors });
  }

  const postId = parsedBody.data.pId;
  const name = parsedBody.data.name;
  const data = parsedBody.data.content;
  const { id } = req.body.user;

  console.log(id);
  console.log("before try",req.body.user,id);

  try {
    console.log("try");

    const blogPost = await prisma.blogPost.findUnique({
      where: {
        id: postId
      }
    });
    
    console.log(blogPost, "success");

    if (!blogPost) {
      return res.status(400).json({ error: "Invalid PostId" });
    }

    const newComment = await prisma.blogComment.create({
      data: {
        postId: postId,
        name: name,
        content: data,
        authorId: id
      }
    });

    console.log(newComment);

    res.status(200).json({ message: "New comment added" ,comment:newComment});

  } catch (error) {
    console.log("outer catch", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;