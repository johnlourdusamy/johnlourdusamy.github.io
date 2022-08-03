    $('#tutorial-fillblank').quizyFillBlank({
          textItems:['1. The solid angle is measured in ', '. <br/>2. The coldness or hotness of a substance is expressed by ', '<br/>3. is used to measure electric current.', '<br/>4. One mole of a substance contains', 'atoms or molecules. <br/>5. The uncertainty in measurement is called as', '. <br/>6. The closeness of the measured value to the original value is', '. <br/>7. The intersection of two straight lines gives us ', '.'],
          anItems:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10' ], 
          anItemsCorrect:[2,0,3,1,5,4,6],
		  anLabels: ['temperature', '6.023 x 10<sup>23</sup>', 'steradius', 'Ammeter', 'accurate', 'error', 'plane angle', 'solid angle', 'celsius', 'ampere' ],
          blockSize:25
        });