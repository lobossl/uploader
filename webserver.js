/*
	myCloud v1.0.0-alpha by Lobo
*/
const express = require("express")
const upload = require("express-fileupload")
const fs = require("fs")

const app = express()

app.use(upload())
app.use(express.static('uploads'))

const mainFile = "/index.html"
const saveFolder = "/home/user/myCloud/myFiles/"

app.get("/",(req,res) =>
{
	res.sendFile(__dirname + mainFile)
})

app.get("/list",(req,res) =>
{
	test = ""

	fs.readdir(saveFolder,(err,files) =>
	{
		if(err)
		{
			console.log(err)
		}
		else
		{
			files.forEach((file) =>
			{
				test += "<a href='/" + file + "'>" + file + "<br>"
			})
		}

		res.send(test)
	})
})

app.post("/",(req,res) =>
{
	if(req.files)
	{
		let getInfo = req.files.file

		fs.writeFile(saveFolder + getInfo.name, getInfo.data,(err) =>
		{
			if(err)
			{
				res.send("Error!")
			}
			else
			{
				res.send("Sucessfully uploaded file " + getInfo.name + " Size(" + getInfo.size + " bytes)")
			}
		})
	}
})

app.listen(3331)
