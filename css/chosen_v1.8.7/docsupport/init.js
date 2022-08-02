var config = {
  '.chosen-select' : {max_selected_options: 3, disable_search_threshold: 3, no_results_text: 'Oops, nothing found!',width: '95%' }
}
for (var selector in config) {
  $(selector).chosen(config[selector]);
}
