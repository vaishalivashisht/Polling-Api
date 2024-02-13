const Options = require("../models/Options");
const Questions = require("../models/Questions");

// Create Option
module.exports.create = (req, res) => {
  const questionId = req.params.questionId;
  Options.create({ text: req.body.option })
    .then((option) => {
      if (option) {
        console.log("Successfully Created Option!!");

        // option.link_to_vote = `http://127.0.0.1:8000/api/v1/options/${option._id}/add_vote`;
        option.link_to_vote = `https://polling-system-api-x3h9.onrender.com/api/v1/options/${option._id}/add_vote`;
        option.save();

        Questions.findById(questionId)
          .then((question) => {
            if (!question) {
              return res.status(404).json({ message: "Question not found" });
            }

            question.options.push(option._id);
            question.save();

            res
              .status(200)
              .json({ message: "Successfully created option!", question });
          })
          .catch((err) => {
            console.log("Error finding question:", err);
            res.status(500).json({ message: "Internal Server Error" });
          });
      }
    })
    .catch((err) => {
      console.log("Error creating option:", err);
      res.status(500).json({ message: "Internal Server Error" });
    });
};

//   Adding Vote
module.exports.addVote = (req, res) => {
  const optionId = req.params.optionId;
  Options.findById(optionId)
    .then((option) => {
      if (option) {
        // console.log("votes: ",option.votes);
        option.votes = option.votes + 1;
        option.save();
        // console.log("votes: ",option.votes);
        res.status(200).json({ message: "Successfully Added Vote!" });
      }
    })
    .catch((err) => {
      console.log("Error");
      res.status(500).json({ message: "Internal Server Error!!" });
    });
};

//   Deleting Option only if have no votes on it
module.exports.delete = (req, res) => {
    const optionId = req.params.optionId;
    Options.findById(optionId)
      .then((option) => {
        if (option) {
          if (option.votes === 0) {
            option.deleteOne().then(() => {
              return res
                .status(200)
                .json({ message: "Successfully Deleted Option!!" });
            });
          } else {
            return res
              .status(400)
              .json({ message: "Cannot delete option having votes" });
          }
        } else {
          return res.status(404).json({ message: "Option Not Found!" });
        }
      })
      .catch((err) => {
        return res.status(500).json({ message: "Internal Server Error" });
      });
  };
