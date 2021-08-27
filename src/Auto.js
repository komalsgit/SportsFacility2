( function() {
    const availableTags = [
      "ABC Thane",
      "ABC Airoli",
      "ABC Bandra",
      "ABC Dadar",
      "PQR ",
      "C++",
      "Ci Delhi",
      "PQR Delhi",
      "ColdFusion Kolkata",
      "Erlang Chennai",
      "First ",
      "Groovy",
      "HIFI",
      "Java",
      "JavaScript",
      "XYZ",
      "XYZ 2",
      "PHP",
      "Python",
      "Ruby",
      "Scalar",
      "Vector"
    ];
    ( "#tags" ).autocomplete({
      source: availableTags
    });
  } );