import { socket } from "../../socket";
import "./index.css"
 const Chat = () =>{
    return <><h2 class="text-center">Chat</h2>
    <div class="container">
      <div class="message-candidate center-block">
        <div class="row">
          <div class="col-xs-8 col-md-6">
            <img src="http://imgc.allpostersimages.com/images/P-473-488-90/68/6896/2GOJ100Z/posters/despicable-me-2-minions-movie-poster.jpg" class="message-photo"/>
            <h4 class="message-name">Mr. Minion</h4>
          </div>
          <div class="col-xs-4 col-md-6 text-right message-date">Date here</div>
        </div>
        <div class="row message-text">
            text over here text over here text over here text over here text over here text over here text over here text over here text over here 
        </div>
      </div>
      <div class="message-hiring-manager center-block">
        <div class="row">
          <div class="col-xs-8 col-md-6">
            <img src="http://imgc.allpostersimages.com/images/P-473-488-90/68/6896/2GOJ100Z/posters/despicable-me-2-minions-movie-poster.jpg" class="message-photo" />
            <h4 class="message-name">Mr. Minion</h4>
          </div>
          <div class="col-xs-4 col-md-6 text-right message-date">Date here</div>
        </div>
        <div class="row message-text ">
            text over here text over here text over here text over here text over here text over here text over here text over here text over here 
        </div>
      </div>
      <div class="messaging center-block">
        <div class="row">
          <div class="col-md-12">
            <div class="input-group">
              <input type="text" class="form-control" />
              <span class="input-group-btn">
                <button class="btn btn-default" type="button">Send</button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
}

export default Chat;