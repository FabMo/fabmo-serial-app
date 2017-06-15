fabmo-hershey-app.fma: clean *.png *.html js/* js/libs/*.js hershey/* css/* icon.png package.json
	zip fabmo-hershey-app.fma *.png *.html js/* js/libs/*.js hershey/* css/* icon.png package.json

.PHONY: clean

clean:
	rm -rf fabmo-hershey-app.fma
