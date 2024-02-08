

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
 * RegisteredProductqueryresponseValueInnerExternalIdsInner
 */

// CHECKSTYLE:OFF
public class RegisteredProductqueryresponseValueInnerExternalIdsInner 
// CHECKSTYLE:ON
{
  @JsonProperty("id")
  private String id;

  @JsonProperty("externalId")
  private String externalId;

  @JsonProperty("communicationSystemDisplayId")
  private String communicationSystemDisplayId;

  @JsonProperty("communicationSystemId")
  private UUID communicationSystemId;

  @JsonProperty("type")
  private String type;

  @JsonAnySetter
  private final Map<String, Object> cloudSdkCustomFields = new LinkedHashMap<>();

   /**
   * Set the id of this {@link RegisteredProductqueryresponseValueInnerExternalIdsInner} instance and return the same instance.
   *
   * @param id  The id of this {@link RegisteredProductqueryresponseValueInnerExternalIdsInner}
   * @return The same instance of this {@link RegisteredProductqueryresponseValueInnerExternalIdsInner} class
   */
   @Nonnull public RegisteredProductqueryresponseValueInnerExternalIdsInner id(@Nonnull final String id) {
    this.id = id;
    return this;
  }

   /**
   * Get id
   * @return id  The id of this {@link RegisteredProductqueryresponseValueInnerExternalIdsInner} instance.
  **/
  @Nonnull public String getId() {
    return id;
  }

  /**
  * Set the id of this {@link RegisteredProductqueryresponseValueInnerExternalIdsInner} instance.
  *
  * @param id  The id of this {@link RegisteredProductqueryresponseValueInnerExternalIdsInner}
  */
  public void setId( @Nonnull final String id) {
    this.id = id;
  }

   /**
   * Set the externalId of this {@link RegisteredProductqueryresponseValueInnerExternalIdsInner} instance and return the same instance.
   *
   * @param externalId  The externalId of this {@link RegisteredProductqueryresponseValueInnerExternalIdsInner}
   * @return The same instance of this {@link RegisteredProductqueryresponseValueInnerExternalIdsInner} class
   */
   @Nonnull public RegisteredProductqueryresponseValueInnerExternalIdsInner externalId(@Nonnull final String externalId) {
    this.externalId = externalId;
    return this;
  }

   /**
   * Get externalId
   * @return externalId  The externalId of this {@link RegisteredProductqueryresponseValueInnerExternalIdsInner} instance.
  **/
  @Nonnull public String getExternalId() {
    return externalId;
  }

  /**
  * Set the externalId of this {@link RegisteredProductqueryresponseValueInnerExternalIdsInner} instance.
  *
  * @param externalId  The externalId of this {@link RegisteredProductqueryresponseValueInnerExternalIdsInner}
  */
  public void setExternalId( @Nonnull final String externalId) {
    this.externalId = externalId;
  }

   /**
   * Set the communicationSystemDisplayId of this {@link RegisteredProductqueryresponseValueInnerExternalIdsInner} instance and return the same instance.
   *
   * @param communicationSystemDisplayId  The communicationSystemDisplayId of this {@link RegisteredProductqueryresponseValueInnerExternalIdsInner}
   * @return The same instance of this {@link RegisteredProductqueryresponseValueInnerExternalIdsInner} class
   */
   @Nonnull public RegisteredProductqueryresponseValueInnerExternalIdsInner communicationSystemDisplayId(@Nonnull final String communicationSystemDisplayId) {
    this.communicationSystemDisplayId = communicationSystemDisplayId;
    return this;
  }

   /**
   * Get communicationSystemDisplayId
   * @return communicationSystemDisplayId  The communicationSystemDisplayId of this {@link RegisteredProductqueryresponseValueInnerExternalIdsInner} instance.
  **/
  @Nonnull public String getCommunicationSystemDisplayId() {
    return communicationSystemDisplayId;
  }

  /**
  * Set the communicationSystemDisplayId of this {@link RegisteredProductqueryresponseValueInnerExternalIdsInner} instance.
  *
  * @param communicationSystemDisplayId  The communicationSystemDisplayId of this {@link RegisteredProductqueryresponseValueInnerExternalIdsInner}
  */
  public void setCommunicationSystemDisplayId( @Nonnull final String communicationSystemDisplayId) {
    this.communicationSystemDisplayId = communicationSystemDisplayId;
  }

   /**
   * Set the communicationSystemId of this {@link RegisteredProductqueryresponseValueInnerExternalIdsInner} instance and return the same instance.
   *
   * @param communicationSystemId  The communicationSystemId of this {@link RegisteredProductqueryresponseValueInnerExternalIdsInner}
   * @return The same instance of this {@link RegisteredProductqueryresponseValueInnerExternalIdsInner} class
   */
   @Nonnull public RegisteredProductqueryresponseValueInnerExternalIdsInner communicationSystemId(@Nonnull final UUID communicationSystemId) {
    this.communicationSystemId = communicationSystemId;
    return this;
  }

   /**
   * Get communicationSystemId
   * @return communicationSystemId  The communicationSystemId of this {@link RegisteredProductqueryresponseValueInnerExternalIdsInner} instance.
  **/
  @Nonnull public UUID getCommunicationSystemId() {
    return communicationSystemId;
  }

  /**
  * Set the communicationSystemId of this {@link RegisteredProductqueryresponseValueInnerExternalIdsInner} instance.
  *
  * @param communicationSystemId  The communicationSystemId of this {@link RegisteredProductqueryresponseValueInnerExternalIdsInner}
  */
  public void setCommunicationSystemId( @Nonnull final UUID communicationSystemId) {
    this.communicationSystemId = communicationSystemId;
  }

   /**
   * Set the type of this {@link RegisteredProductqueryresponseValueInnerExternalIdsInner} instance and return the same instance.
   *
   * @param type  The type of this {@link RegisteredProductqueryresponseValueInnerExternalIdsInner}
   * @return The same instance of this {@link RegisteredProductqueryresponseValueInnerExternalIdsInner} class
   */
   @Nonnull public RegisteredProductqueryresponseValueInnerExternalIdsInner type(@Nonnull final String type) {
    this.type = type;
    return this;
  }

   /**
   * Get type
   * @return type  The type of this {@link RegisteredProductqueryresponseValueInnerExternalIdsInner} instance.
  **/
  @Nonnull public String getType() {
    return type;
  }

  /**
  * Set the type of this {@link RegisteredProductqueryresponseValueInnerExternalIdsInner} instance.
  *
  * @param type  The type of this {@link RegisteredProductqueryresponseValueInnerExternalIdsInner}
  */
  public void setType( @Nonnull final String type) {
    this.type = type;
  }

  /**
   * Get the names of the unrecognizable properties of the {@link RegisteredProductqueryresponseValueInnerExternalIdsInner}.
   * @return The set of properties names
   */
  @Nonnull
  public Set<String> getCustomFieldNames() {
    return cloudSdkCustomFields.keySet();
  }

  /**
   * Get the value of an unrecognizable property of the {@link RegisteredProductqueryresponseValueInnerExternalIdsInner}.
   * @param name  The name of the property
   * @return The value of the property
   * @throws NoSuchElementException  If no property with the given name could be found.
   */
  @Nullable
  public Object getCustomField(@Nonnull final String name) throws NoSuchElementException {
    if( !cloudSdkCustomFields.containsKey(name) ) {
        throw new NoSuchElementException("RegisteredProductqueryresponseValueInnerExternalIdsInner has no field with name '" + name + "'.");
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
    final RegisteredProductqueryresponseValueInnerExternalIdsInner registeredProductqueryresponseValueInnerExternalIdsInner = (RegisteredProductqueryresponseValueInnerExternalIdsInner) o;
    return Objects.equals(this.cloudSdkCustomFields, registeredProductqueryresponseValueInnerExternalIdsInner.cloudSdkCustomFields) &&
        Objects.equals(this.id, registeredProductqueryresponseValueInnerExternalIdsInner.id) &&
        Objects.equals(this.externalId, registeredProductqueryresponseValueInnerExternalIdsInner.externalId) &&
        Objects.equals(this.communicationSystemDisplayId, registeredProductqueryresponseValueInnerExternalIdsInner.communicationSystemDisplayId) &&
        Objects.equals(this.communicationSystemId, registeredProductqueryresponseValueInnerExternalIdsInner.communicationSystemId) &&
        Objects.equals(this.type, registeredProductqueryresponseValueInnerExternalIdsInner.type);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, externalId, communicationSystemDisplayId, communicationSystemId, type, cloudSdkCustomFields);
  }

  @Override
  @Nonnull public String toString() {
    final StringBuilder sb = new StringBuilder();
    sb.append("class RegisteredProductqueryresponseValueInnerExternalIdsInner {\n");
    sb.append("    id: ").append(toIndentedString(id)).append("\n");
    sb.append("    externalId: ").append(toIndentedString(externalId)).append("\n");
    sb.append("    communicationSystemDisplayId: ").append(toIndentedString(communicationSystemDisplayId)).append("\n");
    sb.append("    communicationSystemId: ").append(toIndentedString(communicationSystemId)).append("\n");
    sb.append("    type: ").append(toIndentedString(type)).append("\n");
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

