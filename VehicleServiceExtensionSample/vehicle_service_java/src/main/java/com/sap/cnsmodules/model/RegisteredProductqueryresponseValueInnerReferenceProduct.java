

/*
 * Registered Product Service
 * The registered product is an instance of a product associated with a customer and generally has a serial ID. Registered product contains information describing its physical location, parties involved, such as the customer or employee responsible, product, and warranty.
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

package com.sap.cnsmodules.model;

import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Objects;
import java.util.Set;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonTypeName;
import com.fasterxml.jackson.annotation.JsonValue;
import java.util.UUID;
import java.io.Serializable;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.fasterxml.jackson.annotation.JsonTypeName;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

/**
 * RegisteredProductqueryresponseValueInnerReferenceProduct
 */

// CHECKSTYLE:OFF
public class RegisteredProductqueryresponseValueInnerReferenceProduct 
// CHECKSTYLE:ON
{
  @JsonProperty("displayId")
  private String displayId;

  @JsonProperty("description")
  private String description;

  @JsonProperty("id")
  private UUID id;

  @JsonAnySetter
  private final Map<String, Object> cloudSdkCustomFields = new LinkedHashMap<>();

   /**
   * Set the displayId of this {@link RegisteredProductqueryresponseValueInnerReferenceProduct} instance and return the same instance.
   *
   * @param displayId  The displayId of this {@link RegisteredProductqueryresponseValueInnerReferenceProduct}
   * @return The same instance of this {@link RegisteredProductqueryresponseValueInnerReferenceProduct} class
   */
   @Nonnull public RegisteredProductqueryresponseValueInnerReferenceProduct displayId(@Nonnull final String displayId) {
    this.displayId = displayId;
    return this;
  }

   /**
   * Get displayId
   * @return displayId  The displayId of this {@link RegisteredProductqueryresponseValueInnerReferenceProduct} instance.
  **/
  @Nonnull public String getDisplayId() {
    return displayId;
  }

  /**
  * Set the displayId of this {@link RegisteredProductqueryresponseValueInnerReferenceProduct} instance.
  *
  * @param displayId  The displayId of this {@link RegisteredProductqueryresponseValueInnerReferenceProduct}
  */
  public void setDisplayId( @Nonnull final String displayId) {
    this.displayId = displayId;
  }

   /**
   * Set the description of this {@link RegisteredProductqueryresponseValueInnerReferenceProduct} instance and return the same instance.
   *
   * @param description  The description of this {@link RegisteredProductqueryresponseValueInnerReferenceProduct}
   * @return The same instance of this {@link RegisteredProductqueryresponseValueInnerReferenceProduct} class
   */
   @Nonnull public RegisteredProductqueryresponseValueInnerReferenceProduct description(@Nonnull final String description) {
    this.description = description;
    return this;
  }

   /**
   * Get description
   * @return description  The description of this {@link RegisteredProductqueryresponseValueInnerReferenceProduct} instance.
  **/
  @Nonnull public String getDescription() {
    return description;
  }

  /**
  * Set the description of this {@link RegisteredProductqueryresponseValueInnerReferenceProduct} instance.
  *
  * @param description  The description of this {@link RegisteredProductqueryresponseValueInnerReferenceProduct}
  */
  public void setDescription( @Nonnull final String description) {
    this.description = description;
  }

   /**
   * Set the id of this {@link RegisteredProductqueryresponseValueInnerReferenceProduct} instance and return the same instance.
   *
   * @param id  The id of this {@link RegisteredProductqueryresponseValueInnerReferenceProduct}
   * @return The same instance of this {@link RegisteredProductqueryresponseValueInnerReferenceProduct} class
   */
   @Nonnull public RegisteredProductqueryresponseValueInnerReferenceProduct id(@Nonnull final UUID id) {
    this.id = id;
    return this;
  }

   /**
   * Get id
   * @return id  The id of this {@link RegisteredProductqueryresponseValueInnerReferenceProduct} instance.
  **/
  @Nonnull public UUID getId() {
    return id;
  }

  /**
  * Set the id of this {@link RegisteredProductqueryresponseValueInnerReferenceProduct} instance.
  *
  * @param id  The id of this {@link RegisteredProductqueryresponseValueInnerReferenceProduct}
  */
  public void setId( @Nonnull final UUID id) {
    this.id = id;
  }

  /**
   * Get the names of the unrecognizable properties of the {@link RegisteredProductqueryresponseValueInnerReferenceProduct}.
   * @return The set of properties names
   */
  @Nonnull
  public Set<String> getCustomFieldNames() {
    return cloudSdkCustomFields.keySet();
  }

  /**
   * Get the value of an unrecognizable property of the {@link RegisteredProductqueryresponseValueInnerReferenceProduct}.
   * @param name  The name of the property
   * @return The value of the property
   * @throws NoSuchElementException  If no property with the given name could be found.
   */
  @Nullable
  public Object getCustomField(@Nonnull final String name) throws NoSuchElementException {
    if( !cloudSdkCustomFields.containsKey(name) ) {
        throw new NoSuchElementException("RegisteredProductqueryresponseValueInnerReferenceProduct has no field with name '" + name + "'.");
    }
    return cloudSdkCustomFields.get(name);
  }

  @Override
  public boolean equals(@Nullable final java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    final RegisteredProductqueryresponseValueInnerReferenceProduct registeredProductqueryresponseValueInnerReferenceProduct = (RegisteredProductqueryresponseValueInnerReferenceProduct) o;
    return Objects.equals(this.cloudSdkCustomFields, registeredProductqueryresponseValueInnerReferenceProduct.cloudSdkCustomFields) &&
        Objects.equals(this.displayId, registeredProductqueryresponseValueInnerReferenceProduct.displayId) &&
        Objects.equals(this.description, registeredProductqueryresponseValueInnerReferenceProduct.description) &&
        Objects.equals(this.id, registeredProductqueryresponseValueInnerReferenceProduct.id);
  }

  @Override
  public int hashCode() {
    return Objects.hash(displayId, description, id, cloudSdkCustomFields);
  }

  @Override
  @Nonnull public String toString() {
    final StringBuilder sb = new StringBuilder();
    sb.append("class RegisteredProductqueryresponseValueInnerReferenceProduct {\n");
    sb.append("    displayId: ").append(toIndentedString(displayId)).append("\n");
    sb.append("    description: ").append(toIndentedString(description)).append("\n");
    sb.append("    id: ").append(toIndentedString(id)).append("\n");
    cloudSdkCustomFields.forEach((k,v) -> sb.append("    ").append(k).append(": ").append(toIndentedString(v)).append("\n"));
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(final java.lang.Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }

}

