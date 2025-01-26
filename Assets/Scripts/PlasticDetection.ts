import {Interactable} from "../SpectaclesInteractionKit/Components/Interaction/Interactable/Interactable";
import {ProductPage} from "./ProductPage";
import {WebView} from "../Web View/WebView";

@component
export class PlasticDetection extends BaseScriptComponent {
  @input remoteServiceModule: RemoteServiceModule;
  @input productPage: SceneObject;
  @input webView: SceneObject;

  private ImageQuality = CompressionQuality.HighQuality;
  private ImageEncoding = EncodingType.Jpg;

  //in typescript, type comes after the var name, so our var here is imageTex of type Texture
  makeImageRequest(imageTex: Texture, callback) {
    print("Making image request...");
        
        
    Base64.encodeTextureAsync( 
                  imageTex, //image texture
                    
                  //nothing is returned if image encoding is a success,
                  //but everything in right here is called and happens,
                  //AND image is encoded as the string "base64String"
                  //the called sendVisionModel method takes the image
                  //encoded string and calls the method that uses the CV model
                  //to detect if it has EVIL plastic in it
                  (base64String) => {
                    print("Image encode Success!");
                    this.sendVisionModel(base64String, callback);
                  },
                    
                  //if image encoding fails, stuff right below in the brackets happens
                  //Again, nothing is actually returned.
                  () => {
                    print("Image encoding failed!");
                  },
                  this.ImageQuality,
                  this.ImageEncoding 
    );
        
        
  }
    
    
    
  async sendVisionModel(image64: string, callback: (response: string, productPage: SceneObject, webView: SceneObject) => void) {
        const webRequest = new Request(
              "https://9b58-192-54-222-158.ngrok-free.app/identify",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({image_url: image64}),
              }
            ); 
        

        try {
          let resp = await this.remoteServiceModule.fetch(webRequest);
          if (resp.status == 200) {
            let bodyText = await resp.text();
            var bodyJson = JSON.parse(bodyText);

            if (bodyJson.name != "other" && bodyJson.urls && bodyJson.urls.length > 0) {
              this.productPage.enabled = true;
              this.webView.enabled = true;
              const productPageType = ProductPage.getTypeName()
              const pageComponent = this.productPage.getComponent(productPageType);
              pageComponent.setInfo(this.webView, bodyJson.urls[0].url, bodyJson.urls[0].desc, "")

              callback(bodyJson, this.productPage, this.webView);
              print(bodyJson.name);
            } else {
              this.productPage.enabled = false;
              this.webView.enabled = false;
            }
          }
          else {
            print("error code: " + resp.status);
          }
        } catch (e) {
          print (e)
        }
    }
  
    


}
