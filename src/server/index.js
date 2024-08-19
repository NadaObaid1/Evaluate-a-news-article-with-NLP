import express from "express";
import path from "path";
import url from "url";
import dotenv from "dotenv";
import https from "https";
import querystring from "querystring";
import cors from "cors";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
dotenv.config();
const app = express();
const port = process.env.PORT || 8001;
const apiKey = process.env.API_KEY;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../../dist")));

app.post("/api", (req, res) => {
  const { endpoint, url } = req.body;

  if (!endpoint || !url) {
    return res
      .status(400)
      .send("Please provide both the API endpoint and the URL for analysis.");
  }

  const apiUrl = "api.meaningcloud.com";
  console.log(`Forwarding request to: ${apiUrl}${endpoint}`);

  const postData = querystring.stringify({
    key: apiKey,
    url: url,
    lang: "auto",
  });

  const options = {
    hostname: apiUrl,
    port: 443,
    path: endpoint,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": postData.length,
    },
  };

  const request = https.request(options, (response) => {
    let data = "";

    response.on("data", (chunk) => {
      data += chunk;
    });

    response.on("end", () => {
      if (response.statusCode === 200) {
        try {
          const jsonData = JSON.parse(data);
          if (jsonData.status && jsonData.status.code === "102") {
            res.status(429).json({
              error:
                "API request limit exceeded. Please check your API subscription or consider upgrading.",
            });
          } else {
            res.setHeader("Content-Type", "application/json");
            res.send(data);
          }
        } catch (e) {
          console.error("Error parsing the API response:", e);
          res
            .status(500)
            .send("An error occurred while processing the API response.");
        }
      } else {
        console.error(`API error: ${data}`);
        res
          .status(response.statusCode)
          .send(`The API responded with an error: ${response.statusCode}`);
      }
    });
  });

  request.on("error", (error) => {
    console.error("Request error:", error);
    res
      .status(500)
      .send("A server error occurred while processing your request.");
  });

  request.write(postData);
  request.end();
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
