import { Router, Request, Response } from "express";

const indexRouter = Router();

indexRouter.get("/", async (_req: Request, res: Response) => {
  res.send(`  <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f9;
                color: #333;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
            }
            .container {
                text-align: center;
                padding: 40px;
                background-color: #fff;
                border-radius: 10px;
                box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
            }
            h1 {
                font-size: 2.5rem;
                color: #4CAF50;
                margin-bottom: 20px;
            }
            p {
                font-size: 1.2rem;
                color: #555;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Welcome To Manufcaturing webhook 👨‍✈️ </h1>
        </div>
    </body>
    </html>`);
});

export default indexRouter;
