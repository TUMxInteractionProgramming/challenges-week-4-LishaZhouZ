var currentLocation={
    longitude: 11.5672719,
    latitude: 48.1491745,
    what3words:'gramm.witze.berühmter',
}

var yummy=new Channel('yummy','minus.plus.yummy');
var sevencontinents=new Channel('sevencontinents','minus.plus.sevencontinents');
var killerapp=new Channel('killerapp','minus.plus.killer');
var firstpersononmars= new Channel('firstpersononmars','minus.plus.fpom');
var octoberfest=new Channel('octoberfest','minus.plus.octoberfest');

var currentChannel=sevencontinents;

function Message(text){
    var now = new Date();
    this.createdBy=currentLocation.what3words;
    this.latitude=currentLocation.latitude;
    this.longitude=currentLocation.longitude;
    this.createdOn=now;
    this.expiresOn=now.setMinutes(now.getMinutes() + 15);
    this.text=text;
    this.own=true;
}

function sendMessage(msgtext){
    msg=new Message(msgtext);
    console.log("msg is created");
    $('#messages').append(createMessageElement(msg));
    var h=$('#messages').prop('scrollHeight');
    $('#messages').scrollTop(h);
}

function createMessageElement(messageObject){
    var today = new Date();
    var diffMs = (messageObject.expiresOn - today);
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); 
    var options={ weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',hour12: false};
    var time=messageObject.createdOn.toLocaleString('en-US', options);
    return('<div class="message">'+
    '<h3><a href="http://w3w.co/'+messageObject.createdBy+'" target="_blank"><strong>'
    +messageObject.createdBy+'</strong></a>'+time+'<em>'+diffMins+' min. left</em></h3>'+
    '<p>'+messageObject.text+'</p>'+
    '<button>+5 min.</button></div>');
}

function Channel(name,createdBy){
    this.name=name;
    this.createdOn= new Date("2016-04-01");
    this.createdBy=createdBy;
    this.starred= false;
    this.expiresln=100;
    this.messageCount=999;
    console.log('Channel '+this.name+' is created');    
}


function listChannels(){
    $('#channels ul').append(createChannelElement(yummy));
    $('#channels ul').append(createChannelElement(sevencontinents));
    $('#channels ul').append(createChannelElement(killerapp));
    $('#channels ul').append(createChannelElement(firstpersononmars));
    $('#channels ul').append(createChannelElement(octoberfest));
}

function createChannelElement(channelObject){

    var new_li=$("<li>").attr("onclick","switchChannel("+channelObject.name+")").append(
        '#'+channelObject.name).append(
            $("<span>").attr("class","channel-meta").append(
                $("<i>").attr("class","far fa-star"),
                $("<span>").html(channelObject.messageCount+' new'),
                $("<span>").html(channelObject.expiresln+' min'),
                $("<i>").attr("class","fas fa-chevron-right")                      
                )
        )
    return (new_li);
}