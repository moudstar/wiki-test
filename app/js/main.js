$(document).ready( function () {

  var urlBase = 'https://en.wikipedia.org/w/api.php?origin=*',
  urlSuffix = '&callback=?',
  randomPrefix = '&action=query&generator=random&grnnamespace=0&prop=extracts&exchars=200&grnlimit=12&exlimit=12&exintro&format=json',
  searchTitlePrefix = '&action=query&format=json&prop=extracts&pageids=&generator=search&exchars=200&exintro=1&explaintext=1&inprop=url&gsrlimit=12&gsrprop=snippet&gsrsearch=',
  randomWikiURL = urlBase + randomPrefix + urlSuffix,
  wikiURL = randomWikiURL;

  //load in random articles and HTML format
  function wikiCall() {
    $( '.wiki-article' ).find( '.article' ).remove();

  	$.getJSON ( wikiURL ,function ( data ) {
  		$.each ( data.query.pages, function ( i, item ) {
        randomId = item.pageid;
        randomURL = 'https://en.wikipedia.org/?curid=' + randomId;
        content = '<div class="article"><header><a href="https://en.wikipedia.org/?curid=' + item.pageid;
        content += '" class="link">' + item.title + '</a></header>';
        content += '<div class="article-extract"><a href="https://en.wikipedia.org/?curid=' + item.pageid + '" class="link"><div>' + item.extract + '</div></a></div>';
        content += '</div>';
        $( content ).appendTo( '.wiki-article' );
  		});
  	});
  }

  // load in random articles on page load
  wikiCall();

  // click button to load new random articles
  $( '.reload' ).click( function () {
    wikiCall();
  });

  // click button to show input bar
  $( '.search button' ).click( function () {
    if($( '.searchbar:visible' ).length) {
      $( '.searchbar' ).slideUp();
    } else {
      $( '.searchbar' ).slideDown();
      $( '.searchbar input' ).focus();
    }
  });

  // click button to show input bar
  $( '.amount button' ).click( function () {
    if($( '.filterbar:visible' ).length) {
      $( '.filterbar' ).slideUp();
    } else {
      $( '.filterbar' ).slideDown();
      $( '.filterbar input' ).focus();
    }
  });

  // hide bar again after click button
  $( '.searchbar button, .filterbar button').click( function () {
    $( this ).parent().slideUp();
  });

  // grab the input value in the search field and display results
  function searchWiki() {
    searchItem = $( '.searchbar input' ).val();
    wikiURL = urlBase + searchTitlePrefix + searchItem  + urlSuffix;
    wikiCall();
  }

  // click search button for a specific keyword search to populate the
  // page with the specific keyword
  $( '.searchbar button' ).click( function () {
    searchWiki();
  });

  // hit enter key instead of click to get value
  $( '.searchbar input' ).on( 'keyup', function ( e ) {
    if ( e.keyCode == 13 ) {
      $( this ).parent().slideUp();
      searchWiki();
    }
  });

  // function to display number of articles based on user input
  function articleQuantity() {
    filterResults = $( '.filterbar input' ).val();
    randomPrefix = '&action=query&generator=random&grnnamespace=0&prop=extracts&exchars=500&grnlimit=' + filterResults + '&exlimit=12&exintro&format=json';
    searchTitlePrefix = '&action=query&format=json&prop=extracts&pageids=&generator=search&exchars=200&exintro=1&explaintext=1&inprop=url&gsrprop=snippet&gsrlimit=' + filterResults + '&gsrsearch=';
  }

  // if thre is input in the search box, filter those results
  // if not, filter the random results
  function userValue() {
    if ( $( '.searchbar input' ).val().length === 0 ) {
      wikiURL = urlBase + randomPrefix + urlSuffix;
      wikiCall();
    } else {
      searchWiki();
    }
  }

  // click go to filter limit number of articles returned.
  $( '.filterbar button' ).click( function () {
    if ( $( '.filterbar input' ).val().length === 0 ) {
      alert( 'Please enter a value' );
    } else {
      articleQuantity();
      userValue();
    }
  });

  // hit enter key instead of click to get value
  $( '.filterbar input' ).on( 'keyup', function ( e ) {
    if ( e.keyCode == 13 ) {
      $( this ).parent().slideUp();
      articleQuantity();
      userValue();
    }
  });

  // clear all input values, load in random articles
  $( '.clear-btn' ).click( function () {
    $( 'input' ).val( '' );
    wikiURL = randomWikiURL;
    wikiCall();
  });
});
