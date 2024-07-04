document.addEventListener('DOMContentLoaded', function() {
    try{
    fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448')
    .then(response => response.json())
    .then(data => {
        const product = data.product;

        // product details
        document.getElementById('product-vendor').textContent = product.vendor;
        document.getElementById('product-title').textContent = product.title;
        document.getElementById('product-description').innerHTML = product.description;
        document.getElementById('product-price').textContent = `${product.price}.00`;
        document.getElementById('product-comprice').textContent = `${product.compare_at_price}.00`;

        // Display images
        // const gallery = document.getElementById('product-image-gallery');
        // product.images.forEach(image => {
        //     const imgElement = document.createElement('img');
        //     imgElement.src = image.src;
        //     gallery.appendChild(imgElement);
        // });
        let selectedColor = null;
        let selectedSize = null;
        // Display color options
        const colorOptions = document.getElementById('color-options');
        product.options.find(option => option.name === "Color").values.forEach(color => {
            const [colorName, colorValue] = Object.entries(color)[0];
            const colorBox = document.createElement('div');
            colorBox.className = 'color-box';
            colorBox.style.backgroundColor = colorValue;
            colorBox.title = colorName;
            colorBox.addEventListener('click', function() {
                document.querySelectorAll('.color-box').forEach(box => box.classList.remove('selected'));
                colorBox.classList.add('selected');
                selectedColor = colorName;
            });
            colorOptions.appendChild(colorBox);
        });
        // percent off calculator
        const originalPrice = parseFloat(product.compare_at_price.replace('$', ''));
            const discountedPrice = parseFloat(product.price.replace('$', ''));
            const discountPercentage = ((originalPrice - discountedPrice) / originalPrice) * 100;
            const discountElement = document.createElement('span');
            discountElement.className = 'discount';
            discountElement.textContent = ` ${discountPercentage.toFixed(0)}% off`;
            document.getElementById('percent').appendChild(discountElement);

        // Display size options
        const sizeOptions = document.getElementById('size-options');
        product.options.find(option => option.name === "Size").values.forEach(size => {
            const sizeLabel = document.createElement('label');
            const sizeRadio = document.createElement('input');
            sizeRadio.type = 'radio';
            sizeRadio.name = 'size';
            sizeRadio.value = size;
            sizeRadio.className = 'size-radio';
            sizeRadio.addEventListener('change', function() {
                selectedSize = size;
            });
            sizeLabel.appendChild(sizeRadio);
            sizeLabel.appendChild(document.createTextNode(size));
            sizeOptions.appendChild(sizeLabel);
        });
        
        // quantity selector
        const quantityInput = document.getElementById('quantity');
            document.getElementById('decrease-quantity').addEventListener('click', function() {
                let currentValue = parseInt(quantityInput.value);
                if (currentValue > 1) {
                    quantityInput.value = currentValue - 1;
                }
            });

            document.getElementById('increase-quantity').addEventListener('click', function() {
                let currentValue = parseInt(quantityInput.value);
                quantityInput.value = currentValue + 1;
            });

        // function ChangeImage(fileName){
        //     let img = document.querySelector("main");
        //     img.setAttribute("src",fileName);
        // }
        const button = document.getElementById("add-to-cart");
        const div = document.getElementById("addtocarttext");
        const smallElement = document.createElement('small');
        button.addEventListener("click", () => {
            if(selectedColor===null || selectedSize===null){
                div.style.display = "block"; 
                smallElement.textContent = `Please select Size and Color to added to cart`;
            }
            else{
                div.style.display = "block"; 
            smallElement.textContent = `Embrace Sideboard with Color ${selectedColor} and Size ${selectedSize} added to cart`;
            }
            
            
            
          });
        div.appendChild(smallElement);
    })
}
    catch(error){
        if (error.code === 403) {
            console.error('Permission error:', error);
            alert('You do not have permission to perform this action.');
        } else {
            console.error('Error fetching data:', error);
            alert('An error occurred while fetching data.');
        }
    };
});
