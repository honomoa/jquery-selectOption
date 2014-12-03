
jQuery.fn.selectOption = function(){
	var $this = jQuery(this);
	var selectOption = $this.data('selectOption');
	if(selectOption){
		return selectOption;
	}
	selectOption = new jQuery.MoaSelectOption(this);
	$this.data('selectOption', selectOption);
    return selectOption;
};
jQuery.fn.hideOption = function(selector){
	var $this = jQuery(this);
	var selectOption = $this.data('selectOption');
	if(!selectOption){
		throws('no selectOption defined');
	}
	selectOption.hideOption(selector);
};
jQuery.fn.showOption = function(selector){
	var $this = jQuery(this);
	var selectOption = $this.data('selectOption');
	if(!selectOption){
		throws('no selectOption defined');
	}
	selectOption.showOption(selector);
};
jQuery.fn.showAllOption = function(){
	var $this = jQuery(this);
	var selectOption = $this.data('selectOption');
	if(!selectOption){
		throws('no selectOption defined');
	}
	selectOption.showAllOption();
};
jQuery.fn.hideAllOption = function(){
	var $this = jQuery(this);
	var selectOption = $this.data('selectOption');
	if(!selectOption){
		throws('no selectOption defined');
	}
	selectOption.hideAllOption();
};

jQuery.MoaSelectOption = function(select){
	this.select = select;
	this.init();
};
jQuery.extend(jQuery.MoaSelectOption, {
	prototype: {
		init: function(){
            this.$options = jQuery(this.select).children('option');
		},
        hideOption: function(selector){
			this.memoValue();
            jQuery(this.select).children(selector).each(function(idx,e){
                jQuery(e).remove();
            });
        },
        showOption: function(selector){
			this.memoValue();
			this.childrenValues();
            jQuery(this.select).children().remove();
			var _this = this;
            this.$options.each(function(idx,e){
                if(jQuery(e).filter(selector).length>0 || _this.cValues.indexOf(jQuery(e).val())>=0){
                    jQuery(_this.select).append(e);
                }
            });
        },
        hideAllOption: function(){
			this.memoValue();
            jQuery(this.select).children().remove();
        },
        showAllOption: function(){
			this.memoValue();
            jQuery(this.select).children().remove();
			var _this = this;
            this.$options.each(function(idx,e){
				jQuery(_this.select).append(e);
            });
			this.restoreMemoValue();
        },
        childrenValues: function(){
			this.cValues = [];
			var _this = this;
            jQuery(this.select).children().each(function(idx,e){
				_this.cValues.push(jQuery(e).val());
			});
        },
        memoValue: function(){
			this._memoValue = jQuery(this.select).val();
        },
        restoreMemoValue: function(){
			jQuery(this.select).val(this._memoValue);
        }
	}
});
