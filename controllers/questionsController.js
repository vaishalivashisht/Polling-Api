const Questions = require('../models/Questions');
const Options = require('../models/Options')
// Viewing Question
module.exports.question = (req, res) => {
    const questionId = req.params.questionId;
    Questions.findById(questionId)
      .populate("options")
      .then(question => {
        if (question) {
          res.status(200).json(question);
        } else {
          res.status(404).json({ message: "Question Not Found!" });
        }
      })
      .catch(err => {
        console.log("Error finding Question!", err);
        res.status(500).json({ message: "Internal Server Error" });
      });
  };
  
// Creating Questions
module.exports.create = (req,res)=>{
    console.log("Create Question!");
    Questions.create({
        question: req.body.question
    })
    .then(question=>{
        if(question){ 
            console.log("Successfully created Question!!");
        res.status(200).json({message: "Successfully created Question!", question})
        }
        else{
            console.log("Error creating Question!!");
        res.status(404).json({message: "Couldn't Create Question!"})
        }
    })
    .catch(err=>{
        console.log("Internal Server Error!", err);
        res.status(500).json({message: "Internal Server Error!"})
    })
}

// Delete Question
module.exports.delete = (req, res) => {
    const questionId = req.params.questionId;
  
    Questions.findById(questionId)
      .then(question => {
        if (question) {
          const hasVotes = question.options.some(option => option.votes > 0);
          if (hasVotes) {
            return res.status(400).json({ message: 'Cannot delete question with options having votes' });
          }
          return Options.deleteMany({ _id: { $in: question.options } }); // Delete associated options
        } else {
          return res.status(404).json({ message: 'Question Not Found!' });
        }
      })
      .then(() => {
        return Questions.deleteOne({ _id: questionId }); // Delete the question
      })
      .then(() => {
        return res.status(200).json({ message: 'Successfully Deleted Question!!' });
      })
      .catch(err => {
        console.log('Error deleting question', err);
        return res.status(500).json({ message: 'Error deleting question' });
      });
  };
  
  
  
    // Questions.findByIdAndDelete(questionId)
    //     .then(question=>{
    //         if(question){
    //         res.status(200).json({message: "Successfully Deleted Question!! ", questionId})
    //         }
    //         else{
    //         res.status(404).json({message: "Error Deleting Question!! ", questionId})

    //         }
    //     })
    //     .catch(err=>{
    //         console.log("Internal Server Error!", err);
    //         res.status(500).json({message: "Internal Server Error"})
    //     })

