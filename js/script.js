var after;
    
        window.onscroll = function(ev) {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                var str = document.getElementById("heading").innerText;
                loadContent(str, false, true);
            }
        };
    
        function loadSubreddit() {
            var str = document.getElementById("subreddit").value;
            if(str != '') {
                loadContent(str, true, false);
            }
        }
        
        function goTo(url) {
            window.location.href = url;
        }
        
        function writeHTML(data) {
            var thumb;
            if(data.thumbnail == 'self' || data.thumbnail == '' || data.thumbnail == 'default') {
                thumb = 'http://i.imgur.com/0rwsz12.png';
            } else if(data.thumbnail == 'nsfw') {
                thumb = 'http://i.imgur.com/Ypzn6g3.png';
            } else {
                thumb = data.thumbnail;
            }
            var str =   "<tr>" +
                        "<td rowspan='2'>" +
                        "<a href='" + data.url + "'><img width='70px' max-height='70px' class='img-rounded' src='" + thumb + "'></a>" +
                        "<div><p class='text-center' style='font-size:16px'><br>" + data.score + "</p></div>" +
                        "</td>" +
                        "<td><a href='" + data.url + "'><p style='font-size:15px'>" + data.title + "</p></a></td></tr>" +
                        "<tr>" +
                        "<td><p>by " + "<b style='color: #afb3b9;'>" + data.author + "</b></p><p>to " + "<b style='color: #afb3b9;' onclick='goTo(&quot;http://www.reddit.com/r/" + data.subreddit + "&quot;)'> /r/" + data.subreddit + "</b></p><p><b style='color: #afb3b9;'>" + data.num_comments + " comments</b></p></td>" +
                        "</tr>";
            return str;
        }
        
        
        function loadContent(name, newSubreddit, more) {
            
            if(newSubreddit) {
                document.getElementById("stuff").innerHTML = "";
            }
            
            document.getElementById("heading").textContent = name;
            var stuff = document.getElementById("stuff");
            if(more) {
                reddit.hot(name).after(after).limit(25).fetch(function (res) {
                    for(var i = 0; i < res.data.children.length; i++) {
                        var data = res.data.children[i].data;
                        var str = writeHTML(data);
                        stuff.insertAdjacentHTML('beforeend', str);
                        (i == res.data.children.length - 1) ? after = data.name : "";
                    }
                });
            } else {
                reddit.hot(name).limit(25).fetch(function (res) {
                    for(var i = 0; i < res.data.children.length; i++) {
                        var data = res.data.children[i].data;
                        var str = writeHTML(data);
                        stuff.insertAdjacentHTML('beforeend', str);
                        (i == res.data.children.length - 1) ? after = data.name : "";
                    }
                });
            }
        }
