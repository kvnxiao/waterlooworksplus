var orbisApp = {
  buildForm : function(parameters, action, target){

    var theForm = $(document.createElement("form")).attr("method", "post").attr("action", action).attr("enctype","multipart/form-data");

    if (target && typeof target === "string")
    {
      theForm.attr("target", target);
    }
    else if(target && typeof target === "boolean")
    {
      theForm.attr("target", '_BLANK' + Math.random()*100000);
    }

    $(theForm).insertObject(parameters);

    theForm.append($(document.createElement("input")).attr({
      type : "hidden",
      name : "rand",
      value : Math.floor(Math.random() * 100000)
    }));

    $(theForm).appendTo("body");
    return theForm;
  },
}

$.fn.insertObject = function(obj){

  var $container = $(this);

  $.each(obj, function(name, value){

    var $element = $container.find("[name='"+name+"']");

    if(Object.prototype.toString.call(value) === '[object Array]')
    {
      $.each(value, function(arrayIndex, arrayValue){
        $container.append($(document.createElement("input")).attr({
          type : "checkbox",
          name : name,
          value : arrayValue,
          checked : "checked"
        }).css("display", "none"));
      });
    }
    else if(Object.prototype.toString.call(value) === '[object Object]')
    {
      if($element.length > 0)
      {
        $element.val(JSON.stringify(value));
      }
      else
      {
        $container.append($(document.createElement("input")).attr({
          type : "hidden",
          name : name,
          value : JSON.stringify(value)
        }));
      }

    }
    else
    {
      if($element.length > 0)
      {
        $element.val(value);
      }
      else
      {
        $container.append($(document.createElement("input")).attr({
          type : "hidden",
          name : name,
          value : value
        }));
      }
    }
  });

  return $container;
};