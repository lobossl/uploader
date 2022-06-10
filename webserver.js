/*
	myCloud v1.0.0-alpha
*/
const express = require("express")
const upload = require("express-fileupload")
const fs = require("fs")

const app = express()

app.use(upload())

const mainFile = "/index.html"
const saveFolder = "/home/user/files/"

app.get("/",(req,res) =>
{
	res.sendFile(__dirname + mainFile)
})

app.get("/list",(req,res) =>
{
	fil = ""

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
				fil += file + "<br>"
			})
		}

		res.send(fil)
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
